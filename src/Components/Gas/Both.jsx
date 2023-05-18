import React from 'react'

function Both({ block, minimum, overPay, fee, baseFee, txCount, gasUsed, beforePriorityFee, beforeMaxFee, laterPriorityFee, laterMaxFee, maxFee }) {
  return (
    <div className='flex flex-col w-3/5 mx-auto space-y-2'>
      <div>
        <div className='text-center bg-black bg-opacity-70 p-4 rounded-lg'>
          <div>
            <p className='text-white'>Now (Next Block)</p>
            <p className='text-white text-xs'>Block #{block}</p>
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
          <div className='mt-4'>
            <p className='text-white'>Max Fee</p>
            <p className='text-blue-500 text-4xl'>{maxFee}</p>
          </div>
          <div className='flex mt-2 w-max mx-auto gap-4'>
            <div className='flex items-center'>
              <p className='text-white'>Base Fee:</p>
              <p className='text-white bg-blue-500 w-max p-2 rounded-md ml-2'>{baseFee}</p>
            </div>
            <div className='flex items-center'>
              <p className='text-white'>Tx Count:</p>
              <p className='text-white bg-black w-max p-2 rounded-md ml-2'>{txCount}</p>
            </div>
            <div className='flex items-center'>
              <p className='text-white'>Gas Used:</p>
              <p className='text-white bg-black w-max p-2 rounded-md ml-2'>{gasUsed}</p>
            </div>
          </div>

        </div>

      </div>
      <div className='flex gap-4 text-center justify-between'>
        <div className='items-center rounded-lg w-full space-y-2'>
          <div className='flex gap-4'>
            <div className='items-center rounded-lg w-1/2 bg-black bg-opacity-70 p-4'>
              <p className='text-white'>In 30 Seconds</p>
              <p className='text-white'>Block #{block}</p>
              <div className='flex mt-4'>
                <div className='items-center rounded-lg w-1/2'>
                  <p className='text-white'>Priority Fee</p>
                  <p className='text-white text-2xl'>{beforePriorityFee}</p>
                </div>
                <div className='items-center rounded-lg w-1/2'>
                  <p className='text-white'>Max Fee</p>
                  <p className='text-white text-2xl'>{beforeMaxFee}</p>
                </div>
              </div>
            </div>
            <div className='items-center rounded-lg w-1/2 bg-black bg-opacity-70 p-4'>
              <p className='text-white'>Later</p>
              <p className='text-white'>Block #{block}</p>
              <div className='flex mt-4'>
                <div className='items-center rounded-lg w-1/2'>
                  <p className='text-white'>Priority Fee</p>
                  <p className='text-white text-2xl'>{laterPriorityFee}</p>
                </div>
                <div className='items-center rounded-lg w-1/2'>
                  <p className='text-white'>Max Fee</p>
                  <p className='text-white text-2xl'>{laterMaxFee}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Both