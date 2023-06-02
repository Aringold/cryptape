import React, { useEffect, useState } from 'react';
import { endGame, startGame } from "../game";
import { PassengerDetail } from '../Components/Visualization/PassengerDetail';
import { BlockDetail } from '../Components/Visualization/BlockDetail';

function Visualization() {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState({});
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    startGame();
    return () => {
      endGame()
    }
  }, []);

  window.showTransactionWin = (transaction) => {
    
    setDetailTransaction(transaction);
    setIsTransactionOpen(true)
  }

  window.showBlockWin = (blockNumber) => {
    setBlockNumber(blockNumber);
    setIsBlockOpen(true)
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
          <PassengerDetail hash={detailTransaction.transaction.hash} transaction={detailTransaction} handleClose={handleTransactionClose}></PassengerDetail>
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