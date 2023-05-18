import React from "react";
import { Button, TextInput } from 'flowbite-react'
import { BiSearch } from "react-icons/bi";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';

function Statistic() {
  return (
    <div className="h-max items-center md:p-6 py-6">
      <div className="md:flex justify-between items-center w-full gap-8">
        <div className="space-y-3">
          <p className="text-[40px] font-normal text-white">Some Statistics</p>
          <p className="text-xl font-normal text-white">In real time.</p>
        </div>
        <div className="md:flex space-y-4 md:space-y-0 gap-4 md:mt-0 mt-4 mx-auto md:mx-0">
          <div className="space-y-2">
            <p className="text-white text-sm">Circulating Supply</p>
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <p className="text-sm text-white">120,396,527 CKB</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-sm">Price (USD)</p>
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <p className="text-sm text-white">$0.46</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-sm">24HR Volume (USD)</p>
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <p className="text-sm text-white">$9,636,755</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-black bg-opacity-30 md:w-5/6 w-full mx-auto p-4 rounded-lg space-y-6 grid md:grid-cols-5 grid-cols-2 items-end gap-6">
        <div className="space-y-2">
          <p className="text-white text-sm">Median Txs Per Block</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">150</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Difficulty</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">0</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Gas Limit</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">30,000,000</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Gas Target</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">15,000,000</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Median Block Gas</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">14,550,673</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white text-sm">Median Block Size</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">0.079 MB</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Median Tx Gas Used
            /Limit</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">60.08%</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Average Block Time</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">12 seconds</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">Market Cap (USD)</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">$222,658,333</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-white text-sm">24HR Volume (USD)</p>
          <div className="bg-black bg-opacity-50 p-2 rounded-md">
            <p className="text-sm text-white text-center">$9,636,755</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistic;