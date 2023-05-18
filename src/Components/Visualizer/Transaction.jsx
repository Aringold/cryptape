import React, { useState, useEffect } from "react";
import { Button, TextInput } from 'flowbite-react'
import { BiSearch } from "react-icons/bi";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';
import axios from 'axios'

import { default as CKB } from '@nervosnetwork/ckb-sdk-core';

const ckb = new CKB('http://localhost:8114');

function Transaction() {

  async function getLatestTransactions() {

    const tipBlockNumber = await ckb.rpc.getTipBlockNumber();

    let transactions = [];

    // Search for the latest 10 confirmed transactions
    for (let i = BigInt(tipBlockNumber) - 1n; i >= BigInt(tipBlockNumber) - 10n; i--) { // Note: added `n` to ensure BigInt

      const block = await ckb.rpc.getBlockByNumber(i);

      for (let tx of block.transactions) {

        const transaction = await ckb.rpc.getTransaction(tx.hash);

        if (transaction.txStatus.status === 'committed') {
          transactions.push(transaction);
        }
      }
    }
    console.log(transactions)
    return transactions;
  }

  async function getBlock() {
    // const url = 'https://ckb.getblock.io/mainnet/';
    // const data = {
    //   jsonrpc: '2.0',
    //   method: 'get_tip_block_number',
    //   params: [
    //   ],
    //   id: 'getblock.io'
    // };
    // const headers = {
    //   'x-api-key': '717ccbe2-dd81-4d4a-b495-f0bc94c456da',
    //   'Content-Type': 'application/json'
    // };

    // try {
    //   const response = await axios.post(url, data, { headers });
    //   console.log(parseInt(response.data.result, 16));
    // } catch (error) {
    //   console.error(error);
    // }
  }

  useEffect(() => {
    getLatestTransactions();
  }, [])

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
        <div className="bg-black bg-opacity-50 p-4 md:w-1/2 w-full md:mt-0 mt-8">
          <div className="border-4 border-black w-full">
            {blockchain_address.map((address, index) => (
              <div className="bg-black bg-opacity-20 border-2 border-black px-8 py-2 flex items-center justify-between w-full" key={index}>
                <p className="text-white">{address}</p>
                <FaHandPaper color="white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;