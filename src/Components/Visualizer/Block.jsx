import React, { useState, useEffect } from "react";
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
import { SiBytedance } from 'react-icons/si'
import { GiStabbedNote } from 'react-icons/gi'
import { MdGasMeter } from 'react-icons/md'
import { FaMoneyBill } from 'react-icons/fa'
import axios from 'axios'

const ckb = new CKB('http://localhost:8114');

function Block() {

  const [latestBlocks, setLatestBlocks] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:8114';

  axios.post('http://localhost:8114', {
    id: 1,
    jsonrpc: '2.0',
    method: 'get_block_by_number',
    "params": [
      "0x98093B"
    ]
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.error(error);
    });

  const blocks = [
    { 'block': '#17170359 (...508E3)', 'time': '30 min 54 sec ago', 'bytes': 171256, 'transactions': 119, 'gasUsed': 13746647, 'baseFee': 70.3 },
    { 'block': '#17170359 (...508E3)', 'time': '30 min 54 sec ago', 'bytes': 171256, 'transactions': 119, 'gasUsed': 13746647, 'baseFee': 70.3 },
    { 'block': '#17170359 (...508E3)', 'time': '30 min 54 sec ago', 'bytes': 171256, 'transactions': 119, 'gasUsed': 13746647, 'baseFee': 70.3 },
    { 'block': '#17170359 (...508E3)', 'time': '30 min 54 sec ago', 'bytes': 171256, 'transactions': 119, 'gasUsed': 13746647, 'baseFee': 70.3 }
  ]

  return (
    <div className="h-max relative items-center p-6 bg-black bg-opacity-20">
      <p className="text-4xl text-white">Latest Blocks.</p>
      <p className="text-base text-white">These are buses that have left the street.</p>

      <p className="text-4xl text-white mt-6">Nervous</p>
      <div className="bg-black bg-opacity-20 p-4 w-full mt-4">
        <div className="border-4 border-black w-full">
          {blocks.map((block, index) => (
            <div key={index} className="bg-black bg-opacity-20 border-2 border-black md:px-8 px-2 py-2 flex flex-col items-center w-full">
              <div className="flex flex-row w-full justify-between">
                <p className="text-white">{block.block}</p>
                <p className="text-white">{block.time}</p>
              </div>
              <div className="md:flex justify-between gap-4 w-full mt-2 space-y-3 md:space-y-0">
                <div className="flex md:w-1/4 w-full items-center bg-[#254354] rounded-md justify-center gap-2 py-2">
                  <SiBytedance color="white" />
                  <p className="text-white text-center">{block.bytes} Bytes</p>
                </div>
                <div className="flex md:w-1/4 w-full items-center bg-[#255449] rounded-md justify-center gap-2 py-2">
                  <GiStabbedNote color="white" />
                  <p className="text-white text-center">{block.transactions} Transactions</p>
                </div>
                <div className="flex md:w-1/4 w-full items-center bg-[#252754] rounded-md justify-center gap-2 py-2">
                  <MdGasMeter color="white" />
                  <p className="text-white text-center">Gas Used {block.gasUsed}</p>
                </div>
                <div className="flex md:w-1/4 w-full items-center bg-[#49381E] rounded-md justify-center gap-2 py-2">
                  <FaMoneyBill color="white" />
                  <p className="text-white text-center">Base Fee {block.baseFee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Block;