import Draggable from 'react-draggable';
import React, { useRef, useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

export const PassengerDetail = (props) => {
  const { hash, handleClose, transaction, transactionStatus } = props;

  const timestampToReal = (timestamp) => {
    const date = new Date(parseInt(timestamp, 16));

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const dateString = date.toLocaleString('en-US', options).replace(/,/g, '');

    return dateString;
  };

  const nodeTransactionRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeTransactionRef}
      handle=".handleTransaction"
      key={hash}
      scale={1}>
      <div className='fixed inset-0 flex items-center justify-start ml-10' ref={nodeTransactionRef}>
        <div className="bg-blue-500 m-3 rounded-xl w-[450px]">
          <div className='flex justify-between items-center p-2'>
            <div className="cursor-move w-full handleTransaction p-2">
              <p className='text-white text-center text-2xl'>{`Transaction ${hash.slice(0, 5)}...${hash.slice(hash.length - 5, hash.length)}`}</p>
            </div>
            <button style={{ display: 'inline-block' }} onClick={handleClose}>
              <AiFillCloseCircle size={40} color='red' />
            </button>
          </div>
          <div>
            {
              !transactionStatus?
              <Loading />
              :
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
                    <p className="text-white w-1/2 text-left">{transactionStatus}</p>
                  </div>
                </li>

                <li className='py-2 bg-[#121920]'>
                  <div className='flex items-center justify-between px-8'>
                    <p className="text-white font-bold w-1/2 text-left">Timestamp</p>
                    <p className="text-white w-1/2 text-left">{timestampToReal(transaction?.timestamp)}</p>
                  </div>
                </li>
                <li className='py-2 bg-[#070B0F]'>
                  <div className='flex items-center justify-between px-8'>
                    <p className="text-white font-bold w-1/2 text-left">Transaction Fee</p>
                    <p className="text-white w-1/2 text-left">{(transaction.transaction_fee || parseInt(transaction.fee, 16)).toLocaleString()}</p>
                  </div>
                </li>
                <li className='py-2 bg-[#121920]'>
                  <div className='flex items-center justify-between px-8'>
                    <p className="text-white font-bold w-1/2 text-left">Size</p>
                    <p className="text-white w-1/2 text-left">{(transaction.tx_size || parseInt(transaction.size, 16)).toLocaleString()}</p>
                  </div>
                </li>
                <li className='py-2 bg-[#070B0F]'>
                  <div className='flex items-center justify-between px-8'>
                    <p className="text-white font-bold w-1/2 text-left">Cycles</p>
                    <p className="text-white w-1/2 text-left">{parseInt(transaction.cycles, 16).toLocaleString()}</p>
                  </div>
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
    </Draggable>
  );
};
