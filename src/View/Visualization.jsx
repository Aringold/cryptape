import React, { useEffect, useState } from 'react';
import { startGame } from "../game";
import { PassengerDetail } from '../Components/Visualization/PassengerDetail';
import { BlockDetail } from '../Components/Visualization/BlockDetail';

var myHeaders = new Headers();

myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

function Visualization() {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState({});
  const [blockNumber, setBlockNumber] = useState();
  useEffect(() => {
    startGame();
  }, []);

  window.showTransactionWin = (transaction) => {
    setIsTransactionOpen(true)
    setDetailTransaction(transaction);
    console.log("transaction:=>>>>>>>>", transaction);
  }

  window.showBlockWin = (blockNumber) => {
    setIsBlockOpen(true)
    setBlockNumber(blockNumber);
    console.log("block:================", blockNumber);
  }

  const handleTransactionClose = () => {
    setIsTransactionOpen(false);
  }

  const handleBlockClose = () => {
    setIsBlockOpen(false);
  }

  return (
    <div className="">
      <div>
        { isTransactionOpen &&
          <PassengerDetail hash={detailTransaction.tx_hash || detailTransaction.transaction.hash} transaction={detailTransaction} handleClose={handleTransactionClose}></PassengerDetail>
        }
        {
          isBlockOpen && 
          <BlockDetail blockNumber={blockNumber} handleClose={handleBlockClose} />
        }
      </div>
    </div>
  )
}

export default Visualization