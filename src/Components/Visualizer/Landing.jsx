import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ToggleSwitch } from 'flowbite-react'

function First() {

  const [isAutoLaunch, setIsAutoLaunch] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="mb-10 h-[100vh]">
      <div className="justify-between items-center w-full mx-auto md:mx-0 flex flex-col h-[100vh]">
        <div className="space-y-3 md:w-max mx-auto mt-10">
          <p className="text-[60px] text-white font-semibold md:text-left text-center">Track your Transactions with ease</p>
        </div>
        <div className="space-y-4 items-center gap-[30px] w-max mx-auto mb-40">
          <Button gradientDuoTone="cyanToBlue" className="">
            <span className="text-white md:text-[32px] text-2xl md:p-4 p-2">Launch App</span>
          </Button>
          <div className="flex items-center gap-3 mx-auto w-max">
            <p className="text-white text-2xl">Auto Launch</p>
            <ToggleSwitch
              checked={isAutoLaunch}
              onChange={() => setIsAutoLaunch(!isAutoLaunch)}
            />
          </div>
        </div>
        {/* <div className="bg-white bg-opacity-20 px-8 py-2 space-y-4 rounded-xl flex flex-col justify-center text-center mt-20 md:w-2/5 w-full">
          <img className="rounded-2xl mx-auto md:w-[70%]" src="assets/banner/2.png"></img>
          <p className="text-white text-2xl">CRYPTAPE NTF's</p>
          <Button gradientDuoTone="cyanToBlue" className="justify-center">
            <Link to='https://pro.opensea.io/collection/moonheads-zoomers' target="_blank" rel="noopener noreferrer">
              <span className="text-white text-[32px] p-4 leading-10">BUY NFT</span>
            </Link>
          </Button>
        </div> */}
      </div>
      {/* <img className="rounded-2xl absolute left-0 -top-[96px] -z-10 h-[100vh]" src="assets/Landing/Landing/back.png" /> */}
    </div>
  );
}

export default First;