import Draggable from 'react-draggable';
import React, { useRef, useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaHandPaper } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
const ckb = new CKB('http://81.0.246.174:2083');

export const BlockDetail = (props) => {
  const { blockNumber, handleClose } = props;
  const [detailBlock, setDetailBlock] = useState();

  const getBlockInfo = async () => {
    console.log(blockNumber);
    const blockInfo = await ckb.rpc.getBlockByNumber(blockNumber);
    setDetailBlock(blockInfo);
    console.log(blockInfo);
  }

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


  useEffect(() => {
    getBlockInfo();
  }, [blockNumber])

  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      key={blockNumber}
      scale={1}>
      <div className='fixed inset-0 flex items-center justify-end mr-10' ref={nodeRef}>
        <div className="bg-blue-500 m-3 rounded-xl w-[450px]">
          <div className='flex justify-between items-center p-2'>
            <div className="cursor-move w-full handle p-2">
              <p className='text-white text-center text-2xl'>{`Block ${blockNumber}`}</p>
            </div>
            <button style={{ display: 'inline-block' }} onClick={handleClose}>
              <AiFillCloseCircle size={40} color='red' />
            </button>
          </div>
          <div className='max-h-[400px] overflow-y-scroll'>
            {
              !detailBlock?.header ?
                <Loading />
                :
                <ul className="" >
                  <li className='py-2 bg-[#121920]'>
                    <div className='flex items-center px-8'>
                      <p className="text-white font-bold w-1/2 text-left">Hash</p>
                      <Link to={`https://explorer.nervos.org/block/${detailBlock?.header?.hash}`} target={'_blank'}><p className="text-blue-300 w-1/2 text-left">{`${detailBlock?.header?.hash.slice(0, 7)}...${detailBlock?.header?.hash.slice(detailBlock?.header?.hash.length - 7, detailBlock?.header?.hash.length)}`}</p></Link>
                    </div>
                  </li>
                  <li className='py-2 bg-[#070B0F]'>
                    <div className='flex items-center justify-between px-8'>
                      <p className="text-white font-bold w-1/2 text-left">Number</p>
                      <p className="text-white w-1/2 text-left">{parseInt(detailBlock?.header?.number, 16).toLocaleString()}</p>
                    </div>
                  </li>
                  <li className='py-2 bg-[#121920]'>
                    <div className='flex items-center justify-between px-8'>
                      <p className="text-white font-bold w-1/2 text-left">Timestamp</p>
                      <p className="text-white w-1/2 text-left">{timestampToReal(detailBlock?.header?.timestamp)}</p>
                    </div>
                  </li>
                  <li className='py-2 bg-[#070B0F]'>
                    <div className='flex items-center justify-between px-8'>
                      <p className="text-white font-bold w-1/2 text-left">Transactions</p>
                      <p className="text-white w-1/2 text-left">{detailBlock?.transactions?.length}</p>
                    </div>
                  </li>
                  {
                    detailBlock?.transactions?.length ?
                      (detailBlock?.transactions?.map((transaction, index) => (
                        <div className="bg-black px-20 py-2 flex items-center justify-between w-full" key={index}>
                          <Link to={`https://explorer.nervos.org/transaction/${transaction?.hash}`} target="_blank"><p className="text-white">{`${transaction?.hash.slice(0, 10)}...${transaction?.hash.slice(transaction?.hash.length - 10, transaction?.hash.length)}`}</p></Link>
                          <FaHandPaper color="white" />
                        </div>
                      )))
                      :
                      <></>
                  }
                </ul>
            }
          </div>
        </div>
      </div>
    </Draggable>
  );
};
