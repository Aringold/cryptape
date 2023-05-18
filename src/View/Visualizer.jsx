import React, { useEffect } from 'react';

import Landing from '../Components/Visualizer/Landing';
import Detail from '../Components/Visualizer/Detail';
import Transaction from '../Components/Visualizer/Transaction';
import Block from '../Components/Visualizer/Block';
import Statistic from '../Components/Visualizer/Statistic';
import Footer from '../Components/Visualizer/Footer';

function Visualizer() {

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  
  return(
    <div className="3xl:mt-[150px]">
      <Landing />
      <Detail />
      <Transaction />
      <Block />
      <Statistic />
      <Footer />
    </div>
  )
}

export default Visualizer