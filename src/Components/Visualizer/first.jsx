import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ToggleSwitch } from 'flowbite-react'

function First() {

  const [isAutoLaunch, setIsAutoLaunch] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="">
      <div className="md:flex md:flex-row flex-col justify-between items-center w-full mx-auto md:mx-0">
        <div className="space-y-3 md:w-max">
          <p className="2xl:text-[50px] text-5xl font-normal text-white w-full md:text-left text-center">Welcome to the ultimate crypto</p>
          <p className="2xl:text-[50px] text-5xl font-normal text-white w-full md:text-left text-center">Track your Transactions with ease</p>
          <p className="text-xl font-normal text-white">providing a safe and secure environment</p>
          <div className="md:flex space-y-4 md:space-y-0 items-center gap-[30px] md:mx-0 w-max mx-auto">
            <Button gradientDuoTone="cyanToBlue">
              <span className="text-white md:text-[32px] text-2xl md:p-4 p-2">Launch App</span>
            </Button>
            <div className="flex items-center gap-3">
              <p className="text-white text-2xl">Auto Launch</p>
              <ToggleSwitch
                checked={isAutoLaunch}
                onChange={() => setIsAutoLaunch(!isAutoLaunch)}
              />
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-20 px-8 py-2 space-y-4 rounded-xl flex flex-col justify-center text-center mt-20 md:w-2/5 w-full">
          <img className="rounded-2xl mx-auto md:w-[70%]" src="assets/banner/2.png"></img>
          <p className="text-white text-2xl">CRYPTAPE NTF's</p>
          <Button gradientDuoTone="cyanToBlue" className="justify-center">
            <Link to='https://pro.opensea.io/collection/moonheads-zoomers' target="_blank" rel="noopener noreferrer">
              <span className="text-white text-[32px] p-4 leading-10">BUY NFT</span>
            </Link>
          </Button>
        </div>
      </div>
      <img className="rounded-2xl absolute -left-56 top-12 -z-10" src="assets/Landing/first/planet.png"></img>
      <div className="flex mt-10 mb-10 w-full justify-between">
        <div className="flex items-center bg-white bg-opacity-20 w-[150px] py-2 px-2 rounded-md">
          <img className="" src="assets/i_ckb.png"></img>
          <p className="text-white ml-3">CKB</p>
        </div>
        <div className="flex items-center bg-white bg-opacity-20 w-[150px] py-2 px-2 rounded-md">
          <img className="" src="assets/i_ckb.png"></img>
          <p className="text-white ml-3">CKB</p>
        </div>
      </div>
    </div>
  );
}

export default First;