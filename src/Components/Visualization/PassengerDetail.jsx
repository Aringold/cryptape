import Draggable from 'react-draggable';
import React, { useRef, useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
const ckb = new CKB('http://127.0.0.1:2083');

export const PassengerDetail = (props) => {
  const { hash, handleClose } = props;
  const [pendingTransaction, setPendingTransaction] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
    myHeaders.append("Content-Type", "application/vnd.api+json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://mainnet-api.explorer.nervos.org/api/v1/transactions/${hash}`, requestOptions)
      .then(response => response.json())
      .then(result => setPendingTransaction(result.data.attributes))
      .catch(error => console.log('error', error));
  }, [])

  const getTransactionDetail = async (transactionHash) => {
    const response = await ckb.rpc.getTransaction(hash);
    console.log(response);
    // setPendingTransaction(response);
  }

  useEffect(() => {
    getTransactionDetail(hash);
  }, [])
  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      key={hash}
      scale={1}>
      <div className='fixed inset-0 flex items-center justify-center z-10' ref={nodeRef}>
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
                <p className="text-white w-1/2 text-left">{pendingTransaction?.tx_status}</p>
              </div>
            </li>
            <li className='py-2 bg-[#121920]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Transaction Fee</p>
                <p className="text-white w-1/2 text-left">{parseInt(pendingTransaction?.transaction_fee).toLocaleString()}</p>
              </div>
            </li>
            <li className='py-2 bg-[#070B0F]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Size</p>
                <p className="text-white w-1/2 text-left">{parseInt(pendingTransaction?.bytes).toLocaleString()}</p>
              </div>
            </li>
            <li className='py-2 bg-[#121920]'>
              <div className='flex items-center justify-between px-8'>
                <p className="text-white font-bold w-1/2 text-left">Cycles</p>
                <p className="text-white w-1/2 text-left">{parseInt(pendingTransaction?.cycles, 16).toLocaleString()}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Draggable>
  );
};
