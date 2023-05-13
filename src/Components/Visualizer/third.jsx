import React from "react";
import { Button, TextInput } from 'flowbite-react'
import { BiSearch } from "react-icons/bi";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';

function Third() {

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
        <div className="bg-white bg-opacity-10 p-4 md:w-1/2 w-full md:mt-0 mt-8">
          <div className="border-4 border-black w-full">
            {blockchain_address.map((address, index) => (
              <div className="bg-white bg-opacity-10 border-2 border-black px-8 py-2 flex items-center justify-between w-full" key={index}>
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

export default Third;