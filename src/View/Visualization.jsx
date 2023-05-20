import React, { useEffect, useState } from 'react';
import { startGame } from "../game";
import { PassengerDetail } from '../Components/Visualization/PassengerDetail';

var myHeaders = new Headers();

myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

function Visualization() {

  useEffect(() => {
    startGame();
  }, []);

  const [transactionsToShow, setTransactionsToShow] = React.useState([]);

  window.showWin = (transactionHash) => {
    setTransactionsToShow((_transactionsToShow) => [..._transactionsToShow, transactionHash]);
  }

  return (
    <div className="3xl:mt-[150px]">
      <div>
        {
          transactionsToShow.map((hash, index) => (
            <PassengerDetail hash={hash} key={index} handleClose={() => setTransactionsToShow(transactionsToShow.filter((transaction) => transaction !== hash))}></PassengerDetail>
          ))
        }
      </div>
    </div>
  )
}

export default Visualization