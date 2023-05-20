import React, { useState, useEffect } from "react";
import { Button, TextInput } from 'flowbite-react'
import { BiSearch } from "react-icons/bi";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';
import axios from 'axios'
import { Link } from "react-router-dom";

import { default as CKB } from '@nervosnetwork/ckb-sdk-core';
import Loading from "../Loading";

const ckb = new CKB('http://localhost:8114');
var myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

function Transaction() {
  const [lastTransactions, setLastTransactions] = useState([]);

  const getLastTransactions = () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://mainnet-api.explorer.nervos.org/api/v1/transactions?page=1&page_size=20", requestOptions)
      .then(response => response.json())
      .then(result => setLastTransactions(result.data))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    setInterval(() => {
      getLastTransactions()
    }, 1000);
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
    <div className="h-max relative items-center p-6 bg-black bg-opacity-70 px-20">
      <div className="md:flex justify-between items-center w-full gap-8">
        <div className="space-y-3 md:w-1/2 w-full">
          <p className="text-[40px] font-normal text-white">Track your Transactions.</p>
          <p className="text-xl font-normal text-white">And anyone else's.</p>
          <p className="text-xl font-normal text-white mt-6">Enter your address in the search bar and click "Follow" to automatically track any new transaction that you send and recieve. You'll be able to see exactly how close each transaction is to confirming and speed them up if needed.</p>
          <p className="text-xl font-normal text-white">You can also see everyone else's transactions. What goes on in the mempool? Watch and find out.</p>

        </div>
        <div className="bg-white bg-opacity-10 p-4 md:w-1/2 w-full md:mt-0 mt-8">
          <div className="border-4 border-black w-full h-[400px] overflow-y-scroll">
            {
              lastTransactions.length?
              (lastTransactions.map((transaction, index) => (
                <div className="bg-black bg-opacity-20 border-2 border-black px-8 py-2 flex items-center justify-between w-full" key={index}>
                  <Link to={`https://explorer.nervos.org/transaction/${transaction.attributes.transaction_hash}`} target="_blank"><p className="text-white">{`${transaction.attributes.transaction_hash.slice(0, 10)}...${transaction.attributes.transaction_hash.slice(transaction.attributes.transaction_hash.length - 10, transaction.attributes.transaction_hash.length)}`}</p></Link>
                  <FaHandPaper color="white" />
                </div>
              )))
              :
              <Loading />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;