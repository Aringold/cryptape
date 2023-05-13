import React from 'react'

function Advance({ block, minimum, overPay, fee, baseFee, txCount, gasUsed, before, later }) {
  return (
    <div className='flex flex-col w-3/5 mx-auto space-y-2'>
      <div>
        <div className='text-center bg-white bg-opacity-5 p-4 rounded-lg'>
          <div>
            <p className='text-white'>Now (Next Block)</p>
            <p className='text-gray-500 text-xs'>Block #{block}</p>
          </div>
          <div className='flex justify-between w-3/4 mx-auto items-end border-b-2 border-blue-500 mt-4'>
            <div className='w-full items-center rounded-lg text-left'>
              <p className='text-blue-500 text-xl'>{minimum}</p>
              <p className='text-white'>Minimum</p>
            </div>
            <div className='w-full items-center rounded-lg'>
              <p className='text-blue-500 text-5xl'>{fee}</p>
            </div>
            <div className='w-full items-center rounded-lg text-right'>
              <p className='text-blue-500 text-xl'>{overPay}</p>
              <p className='text-white'>Overpay</p>
            </div>
          </div>
          <div className='flex mt-2 w-max mx-auto gap-4'>
            <div className='flex items-center'>
              <p className='text-gray-500'>Base Fee:</p>
              <p className='text-white bg-blue-500 w-max p-2 rounded-md ml-2'>{baseFee}</p>
            </div>
            <div className='flex items-center'>
              <p className='text-gray-500'>Tx Count:</p>
              <p className='text-white bg-black w-max p-2 rounded-md ml-2'>{txCount}</p>
            </div>
            <div className='flex items-center'>
              <p className='text-gray-500'>Gas Used:</p>
              <p className='text-white bg-black w-max p-2 rounded-md ml-2'>{gasUsed}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4 text-center justify-between'>
        <div className='items-center rounded-lg w-full space-y-2'>
          <div className='flex gap-4'>
            <div className='items-center rounded-lg w-1/2 bg-white bg-opacity-5 p-4'>
              <p className='text-gray-500'>In 30 Seconds</p>
              <p className='text-gray-500'>Block #{block}</p>
              <p className='text-gray-500 text-2xl mt-4'>{before}</p>
            </div>
            <div className='items-center rounded-lg w-1/2 bg-white bg-opacity-5 p-4'>
              <p className='text-gray-500'>Later</p>
              <p className='text-gray-500'>Block #{block}</p>
              <p className='text-gray-500 text-2xl mt-4'>{later}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advance