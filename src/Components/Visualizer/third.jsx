import React, { useState, useEffect } from "react";
import { Button, TextInput } from 'flowbite-react'
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
import { Indexer } from "@ckb-lumos/ckb-indexer";
import { BiSearch } from "react-icons/bi";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';

import { default as CKB } from '@nervosnetwork/ckb-sdk-core';

const ckb = new CKB('http://localhost:8114');

const webSocket = new WebSocket('ws://localhost:8115');


function Third() {
  const [transactions, setTransactions] = useState([]);

  const blockchain_address = [
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
    '0x44dd3558...f9e5433bbc',
  ]

  useEffect(() => {
    axios.get('https://api.nervosscan.io/ckb/transactions')
      .then(response => {
        setTransactions(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  webSocket.onopen = function (event) {
    console.log('WebSocket is open now.');
  };
  
  webSocket.onerror = function (event) {
    console.error('WebSocket error observed:', event);
  };
  
  webSocket.onmessage = function (event) {
    console.log(`Received data: ${event.data}`);
  };

  webSocket.onmessage = async function (event) {
    const message = JSON.parse(event.data);
  
    if (message.method === 'new_tip_header') {
      const blockHash = message.params.result;
      const blockHeader = await ckb.rpc.getBlockHeader(blockHash);
      
      // Update your React state with the new block header.
    }
  
    if (message.method === 'new_transaction') {
      const transactionHash = message.params.result.transaction.hash;
      const transaction = await ckb.rpc.getTransaction(transactionHash);
    }
  };

  return (
    <div className="h-max relative items-center md:p-6 py-6">
      <div className="md:flex justify-between items-center w-full gap-8">
        <div className="space-y-3 md:w-1/2 w-full">
          <p className="text-[40px] font-normal text-white">Track your Transactions.</p>
          <p className="text-xl font-normal text-white">And anyone else's.</p>
          <p className="text-xl font-normal text-white mt-6">Enter your address in the search bar and click "Follow" to automatically track any new transaction that you send and recieve. You'll be able to see exactly how close each transaction is to confirming and speed them up if needed.</p>
          <p className="text-xl font-normal text-white">You can also see everyone else's transactions. What goes on in the mempool? Watch and find out.</p>
          <TextInput
            id="email4"
            type="email"
            rightIcon={BiSearch}
            placeholder="Enter wallet address"
            required={true}
          />
          <Button gradientDuoTone="cyanToBlue" className="flex flex-row justify-between items-center w-max mt-4">
            <p className="text-white text-2xl">Follow</p>
            <FaArrowRight color="white" className="ml-6" />
          </Button>
        </div>
        <div className="bg-white bg-opacity-10 p-4 md:w-1/2 w-full md:mt-0 mt-8">
          <div className="border-4 border-black w-full">
            {blockchain_address.map((address, index) => (
              <div className="bg-white bg-opacity-10 border-2 border-black px-8 py-2 flex items-center justify-between w-full" key={index}>
                <p className="text-white">{address}</p>
                <FaHandPaper color="white" />
              </div>
            ))}
          </div>
          <div>
            <h2>Latest Cells</h2>
            <ul>
              {latestCells.map((cell, index) => (
                <li key={index}>
                  <p>Block Number: {cell.block_number}</p>
                  <p>Transaction Hash: {cell.out_point.tx_hash}</p>
                  <p>Output Index: {cell.out_point.index}</p>
                  <p>Capacity: {cell.cell_output.capacity}</p>
                  <p>Data: {cell.data}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Third;