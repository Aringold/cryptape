import React from 'react';
import { useEffect } from 'react';
import Footer from './Footer';
import Navbar from "./Navbar";

export default function Layout({children}) {

  return (
    <div className='h-[100vh] flex flex-col justify-between'>
      <Navbar />
      <div
        className='px-10 mx-auto w-full z-10 relative'>
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  )
}
