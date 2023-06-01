import Draggable from 'react-draggable';
import React, { useRef, useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
const ckb = new CKB('http://81.0.246.174:2083');

export const PassengerDetail = (props) => {
  const { hash, handleClose, transaction } = props;
  const [pendingTransaction, setPendingTransaction] = useState();

  const getTransactioInfo = async () => {
    const response = await ckb.rpc.getTransaction(hash);
    setPendingTransaction(response);
    console.log(response);
  }

  useEffect(() => {
    getTransactioInfo();
  }, [hash])

  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      key={hash}
      scale={1}>
      <div className='fixed inset-0 flex items-center justify-end mr-10' ref={nodeRef}>
        <div className="bg-blue-500 m-3 rounded-xl w-[450px]">
          <div className='flex justify-between items-center p-2'>
            <div className="cursor-move w-full handle p-2">
              <p className='text-white text-center text-2xl'>{`Transaction ${hash.slice(0, 5)}...${hash.slice(hash.length - 5, hash.length)}`}</p>
            </div>
            <button style={{ display: 'inline-block' }} onClick={handleClose}>
              <AiFillCloseCircle size={40} color='red' />
            </button>
          </div>
          <ul className="" >
            <li className='py-2 bg-[#121920]'>
              <div className='flex items-center px-8'>
                <p className="text-white font-bold w-1/2 text-left">Hash</p>
                <Link to={`https://explorer.nervos.org/transaction/${hash}`} target={'_blank'}><p className="text-blue-300 w-1/2 text-left">{`${hash.slice(0, 7)}...${hash.slice(hash.length - 7, hash.length)}`}</p></Link>
              </div>
            </li>
            <li className='py-2 bg-[#070B0F]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Status</p>
                <p className="text-white w-1/2 text-left">{pendingTransaction?.txStatus?.status}</p>
              </div>
            </li>
            <li className='py-2 bg-[#121920]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Transaction Fee</p>
                <p className="text-white w-1/2 text-left">{(transaction.transaction_fee || parseInt(transaction.fee, 16)).toLocaleString()}</p>
              </div>
            </li>
            <li className='py-2 bg-[#070B0F]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Size</p>
                <p className="text-white w-1/2 text-left">{(transaction.tx_size || parseInt(transaction.size, 16)).toLocaleString()}</p>
              </div>
            </li>
            <li className='py-2 bg-[#121920]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Cycles</p>
                <p className="text-white w-1/2 text-left">{parseInt(transaction.cycles, 16).toLocaleString()}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Draggable>
  );
};
