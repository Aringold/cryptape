import { Button } from "flowbite-react";
import React from "react";
import { BsTwitter, BsTelegram, BsDiscord } from 'react-icons/bs'

function Sixth() {

  return (
    <div className="bg-gradient-to-b from-[#0D1319] to-[#254354] w-full">
      <div className="md:flex items-center justify-between py-10 px-20 text-center">
        <p className="text-white md:text-[40px] text-3xl">JOIN US ON</p>
        <div className="flex gap-4 justify-center mt-2 md:mt-0">
          <Button gradientDuoTone="cyanToBlue" className="flex flex-row justify-between items-center w-max">
            <BsTwitter color="white" size={30} />
          </Button>
          <Button gradientDuoTone="cyanToBlue" className="flex flex-row justify-between items-center w-max">
            <BsTelegram color="white" size={30} />
          </Button>
          <Button gradientDuoTone="purpleToBlue" className="flex flex-row justify-between items-center w-max">
            <BsDiscord color="white" size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sixth;