import React, { useEffect } from 'react';

import Landing from '../Components/Home/Landing';
import Detail from '../Components/Home/Detail';
import Transaction from '../Components/Home/Transaction';
import Block from '../Components/Home/Block';
import Statistic from '../Components/Home/Statistic';
import Footer from '../Components/Home/Footer';
import { endGame } from '../game';

function Home() {

  useEffect(() => {
    window.scrollTo(0,0);
    endGame();
  }, [])
  
  return(
    <div className="">
      <Landing />
      <Detail />
      <Transaction />
      <Block />
      <Statistic />
      <Footer />
    </div>
  )
}

export default Home