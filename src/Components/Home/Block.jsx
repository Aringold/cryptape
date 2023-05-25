import React, { useState, useEffect, useCallback } from "react";
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
import { SiBytedance } from 'react-icons/si'
import { GiStabbedNote } from 'react-icons/gi'
import { AiOutlineColumnWidth } from 'react-icons/ai'
import { FaMoneyBill } from 'react-icons/fa'
import axios from 'axios'
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { getLastBlockNumber1 } from "../../Utils/api";
import { useQuery } from "react-query";

const ckb = new CKB('https://ckb-mainnet.rebase.network/');
var myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

function Block() {

  const [latestBlocks, setLatestBlocks] = useState([]);
  const [lastBlockNumber, setLastblockNumber] = useState();
  const [prevData, setPrevData] = useState(null);
  const { data, isLoading, isError } = useQuery('lastBlockNumber', getLastBlockNumber1)


  useEffect(() => {
    console.log('API data has changed!', data);

  }, [data, isLoading, isError]);

  useEffect(() => {
    // Create a new instance of the WebSocket provider
    const socket = new WebSocket('ws://localhost:443');

    // Subscribe to new block events
    socket.onmessage = function (event) {
      console.log(`Data received from server: ${event.data}`);
    }

    socket.send(`{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_tip_header"]}`)

    socket.send(`{"id": 2, "jsonrpc": "2.0", "method": "unsubscribe", "params": ["0x0"]}`)
  }, []);

  const getLastBlockNumber = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://mainnet-api.explorer.nervos.org/api/v1/statistics/tip_block_number", requestOptions)
      .then(response => response.json())
      .then(result => (setLastblockNumber(result.data.attributes.tip_block_number), console.log(result.data.attributes.tip_block_number)))
      .catch(error => console.log('error', error));
  }

  const getLastBlocks = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const blockNumbers = [];
    const blockData = [];
    for (let i = 0; i < 10; i++) {
      blockNumbers.push(lastBlockNumber - i);
    }

    for (let blockNumber in blockNumbers) {
      await fetch(`https://mainnet-api.explorer.nervos.org/api/v1/blocks/${blockNumbers[blockNumber]}`, requestOptions)
        .then(response => response.json())
        .then(result => blockData.push(result.data.attributes))
    }
    setLatestBlocks(blockData);
  }

  const timeStampToReal = (timestamp) => {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    return `${days === 0 ? `${remainingHours === 0 ? `${remainingMinutes === 0 ? `${remainingSeconds} SECONDS ` : remainingMinutes + ' MINUTES '}` : remainingHours + ' HOURS '}` : days + ' DAYS '} AGO`
  }

  useEffect(() => {
    setInterval(() => {
      getLastBlockNumber()
    }, 5000);
  }, []);

  useEffect(() => {
    if (lastBlockNumber)
      getLastBlocks()
  }, [lastBlockNumber]);

  return (
    <div className="h-max relative items-center p-6 bg-black bg-opacity-20 md:px-20">
      <p className="text-4xl text-white">Latest Blocks.</p>
      <p className="text-base text-white">These are buses that have left the street.</p>

      <p className="text-4xl text-white mt-6">Nervous</p>
      <div className="bg-black bg-opacity-20 p-4 w-full mt-4">
        <div className="border-4 border-black w-full overflow-y-scroll md:h-[300px] h-[600px]">
          {
            latestBlocks.length ?
              (latestBlocks.map((block, index) => (
                <div key={index} className="bg-black bg-opacity-20 border-2 border-black md:px-8 px-2 py-2 flex flex-col items-center w-full">
                  <div className="flex md:flex-row flex-col w-full justify-between">
                    <Link to={`https://explorer.nervos.org/block/${block.number}`} target="_blank"><p className="text-white">{`#${parseInt(block.number).toLocaleString()}(${block.miner_hash.slice(0, 5)}...${block.miner_hash.slice(block.miner_hash.length - 5)})`}</p></Link>
                    <p className="text-white">{timeStampToReal(Date.now() - block.timestamp)}</p>
                  </div>
                  <div className="md:flex justify-between gap-4 w-full mt-2 space-y-3 md:space-y-0">
                    <div className="flex md:w-1/4 w-full items-center bg-[#254354] rounded-md justify-center gap-2 py-2">
                      <SiBytedance color="white" />
                      <p className="text-white text-center">{parseInt(block.size).toLocaleString()} Bytes</p>
                    </div>
                    <div className="flex md:w-1/4 w-full items-center bg-[#255449] rounded-md justify-center gap-2 py-2">
                      <GiStabbedNote color="white" />
                      <p className="text-white text-center">{block.transactions_count} Transactions</p>
                    </div>
                    <div className="flex md:w-1/4 w-full items-center bg-[#252754] rounded-md justify-center gap-2 py-2">
                      <AiOutlineColumnWidth color="white" />
                      <p className="text-white text-center">Length {parseInt(block.length).toLocaleString()}</p>
                    </div>
                    <div className="flex md:w-1/4 w-full items-center bg-[#49381E] rounded-md justify-center gap-2 py-2">
                      <FaMoneyBill color="white" />
                      <p className="text-white text-center">Transaction Fee {block.total_transaction_fee}</p>
                    </div>
                  </div>
                </div>
              )))
              :
              <Loading />
          }
        </div>

      </div>
    </div>
  );
}

export default Block;