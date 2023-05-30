import React, { useEffect, useState } from 'react';
import { startGame } from "../game";
import { PassengerDetail } from '../Components/Visualization/PassengerDetail';

var myHeaders = new Headers();

myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

function Visualization() {
  const [isOpen, setIsOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState({});
  useEffect(() => {
    startGame();
  }, []);

  window.showWin = (transaction) => {
    setIsOpen(true)
    setDetailTransaction(transaction);
    console.log("transaction:=>>>>>>>>", transaction);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="">
      <div>
        { isOpen &&
          <PassengerDetail hash={detailTransaction.tx_hash || detailTransaction.transaction.hash} transaction={detailTransaction} handleClose={handleClose}></PassengerDetail>
        }
      </div>
    </div>
  )
}

export default Visualization