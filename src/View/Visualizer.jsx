import React, { useEffect } from 'react';

import First from '../Components/Visualizer/first';
import Second from '../Components/Visualizer/second';
import Third from '../Components/Visualizer/third';
import Forth from '../Components/Visualizer/forth';
import Fifth from '../Components/Visualizer/fifth';
import Sixth from '../Components/Visualizer/sixth';

function Visualizer() {

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  
  return(
    <div className="3xl:mt-[150px]">
      <First />
      <Second />
      <Third />
      <Forth />
      <Fifth />
      <Sixth />
    </div>
  )
}

export default Visualizer