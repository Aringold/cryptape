import React, { useEffect, useState } from "react";
import { Button, TextInput } from 'flowbite-react'
import { BiSearch } from "react-icons/bi";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";

const ckb = new CKB('https://mainnet.ckb.dev/rpc')

var myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.api+json  ");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

function Statistic() {

  const [statistics, setStatistics] = useState({});
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0);

  const getEstimatedTime = (timestamp) => {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    if (days > 0)
      return `${days} DAYS AGO`
    else
      return `${remainingHours} h ${remainingMinutes} m`
  }

  const getBlockchainInfo = async () => {

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    await fetch("https://mainnet-api.explorer.nervos.org/api/v1/statistics", requestOptions)
      .then(response => response.json())
      .then(result => { setStatistics(result.data.attributes) })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/nervos-network?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
      .then(response => response.json())
      .then(data => {
        setCirculatingSupply(data.market_data.circulating_supply);
        setPrice(data.market_data.current_price.usd);
        setVolume(data.market_data.total_volume.usd)

      })
      .catch(error => {
        console.error(error);
      });
    setInterval(() => {
      getBlockchainInfo()
    }, 5000);

  }, []);
  return (
    <div className="items-center p-6 md:px-20">
      <div className="md:flex justify-between items-center w-full gap-8">
        <div className="space-y-3">
          <p className="text-[40px] font-normal text-white">Some Statistics</p>
          <p className="text-xl font-normal text-white">In real time.</p>
        </div>
        <div className="md:flex space-y-4 md:space-y-0 gap-4 md:mt-0 mt-4 mx-auto md:mx-0">
          <div className="space-y-2">
            <p className="text-white text-base">Circulating Supply</p>
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <p className="text-base text-white">{parseInt(circulatingSupply).toLocaleString()} CKB</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-base">Price (USD)</p>
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <p className="text-base text-white">{price}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-base">24HR Volume (USD)</p>
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <p className="text-base text-white">$ {volume.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-black bg-opacity-30 md:w-5/6 w-full mx-auto p-4 rounded-lg space-y-6 grid md:grid-cols-4 grid-cols-2 items-end gap-6">
        <div className="space-y-2">
          <p className="text-white text-base">Average Block Time</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{((statistics?.average_block_time | 0) / 1000).toPrecision(3)} s</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base">Epoch Difficulty</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{((statistics?.current_epoch_difficulty || 0) / 1000000000000000000).toPrecision(3)} EH</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base">Epoch Info</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{`${statistics?.epoch_info?.epoch_number || 0} `}<span className="text-sm font-bold ml-3">{` ${statistics?.epoch_info?.index}/${statistics?.epoch_info?.epoch_length}`}</span></p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base">Estimated Epoch Time</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{getEstimatedTime(statistics?.estimated_epoch_time || 0)}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base">Hash Rate</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{((statistics?.hash_rate || 0) / Math.pow(10, 12)).toPrecision(4)} PH</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white text-base">Last Block Number</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{parseInt(statistics?.tip_block_number || 0).toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base">Transactions Per Minute</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{statistics?.transactions_count_per_minute || 0} Txs</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-base">Transactions last 24 HRS</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-base text-white text-center">{statistics?.transactions_last_24hrs || 0} Txs</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Statistic;