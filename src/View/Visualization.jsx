import React, { useEffect, useState } from 'react';
import { endGame, startGame } from "../game";
import { PassengerDetail } from '../Components/Visualization/PassengerDetail';
import { BlockDetail } from '../Components/Visualization/BlockDetail';
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
const ckb = new CKB('http://81.0.246.174:2083');

function Visualization() {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState({});
  const [blockNumber, setBlockNumber] = useState();
  const [detailBlock, setDetailBlock] = useState();
  const [transactionStatus, setTransactionStatus] = useState('');

  useEffect(() => {
    startGame();
    return () => {
      endGame()
    }
  }, []);

  const getBlockInfo = async (blockNumber) => {
    const blockInfo = await ckb.rpc.getBlockByNumber(blockNumber);
    setDetailBlock(blockInfo);
  }

  const getTransactioInfo = async (hash) => {
    const response = await ckb.rpc.getTransaction(hash);
    setTransactionStatus(response.txStatus.status);
    // setPendingTransaction(response);
  }


  window.showTransactionWin = (transaction) => {
    setDetailTransaction({});
    getTransactioInfo(transaction.transaction.hash)
    setDetailTransaction(transaction);
    setIsTransactionOpen(true)
  }

  window.showBlockWin = (blockNumber) => {
    setDetailBlock({});
    getBlockInfo(blockNumber);
    setBlockNumber(blockNumber);
    setIsBlockOpen(true)
  }

  const handleTransactionClose = () => {
    setIsTransactionOpen(false);
    setDetailTransaction({});
  }

  const handleBlockClose = () => {
    setIsBlockOpen(false);
    setDetailBlock({});
  }

  return (
    <div className="">
      <div>
        { isTransactionOpen &&
          <PassengerDetail hash={detailTransaction.transaction.hash} transactionStatus={transactionStatus} transaction={detailTransaction} handleClose={handleTransactionClose}></PassengerDetail>
        }
        {
          isBlockOpen && 
          <BlockDetail blockNumber={blockNumber} detailBlock={detailBlock} handleClose={handleBlockClose} />
        }
      </div>
    </div>
  )
}

export default Visualization