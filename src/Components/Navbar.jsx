import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useState } from 'react'
import OverlayMenu from './OverlayMenu';
import { useNavigate } from "react-router-dom";
import { Button } from 'flowbite-react';

function Navbar() {

  const navigate = useNavigate();

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className={navbarOpen ? 'fixed w-full top-0 z-50' : ''}>
      <OverlayMenu navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <div className={`flex items-center py-3 justify-between w-full md:px-[10%] px-4 z-50 relative ${navbarOpen ? "bg-black" : "bg-transparent"}`}>
        <div className='flex items-center cursor-pointer gap-20'>
          <img src='assets/logo.png' alt='logo'></img>
          <div className='flex items-center gap-8'>
            <p className='text-2xl font-medium text-white hidden md:block cursor-pointer' onClick={() => navigate("/")}>🚌 Visualizer</p>
            <p className='text-2xl font-medium text-white hidden md:block cursor-pointer' onClick={() => navigate("/gas")}>⛽ ETH Gas Price </p>
            <p className='text-2xl font-medium text-white hidden md:block cursor-pointer' onClick={() => navigate("/happening")}>👀 Happening</p>
          </div>
        </div>
        <div className='p-3 space-x-4 flex items-center justify-between'>
          <Button gradientDuoTone="cyanToBlue" className="justify-center hidden md:block">
            <span className="text-white text-2xl px-4 py-1">Connect Wallet</span>
          </Button>
          <div className='md:hidden block'>
            {
              navbarOpen ?
                // <img className='cursor-pointer' src='assets/i_close.png' width={32} height={32} alt='logo' onClick={() => (setNavbarOpen(false), document.documentElement.style.overflowY = "auto")}></img>
                <MdClose className='cursor-pointer text-white' size={32} onClick={() => (setNavbarOpen(false), document.documentElement.style.overflowY = "auto")} />
                :
                // <img className='cursor-pointer' src='assets/i_menu.png' width={32} height={32} alt='logo' onClick={() => (setNavbarOpen(true), document.documentElement.style.overflowY = "hidden")}></img>
                <HiMenu className='cursor-pointer text-white' size={32} onClick={() => (setNavbarOpen(true), document.documentElement.style.overflowY = "hidden")} />
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar

