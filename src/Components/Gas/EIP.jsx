import React from 'react'

function EIP({ priorityFee, maxFee, beforePriorityFee, beforeMaxFee, laterPriorityFee, laterMaxFee }) {
  return (
    <div className='flex flex-col w-3/5 mx-auto space-y-2'>
      <div>
        <div className='text-center bg-black bg-opacity-70 p-4 rounded-lg'>
          <p className='text-white'>Now (Next Block)</p>
          <div className='flex'>
            <div className='w-full items-center p-4 rounded-lg space-y-2'>
              <p className='text-white'>Priority Fee</p>
              <p className='text-blue-500 text-4xl'>{priorityFee}</p>
            </div>
            <div className='w-full items-center p-4 rounded-lg space-y-2'>
              <p className='text-white'>Max Fee</p>
              <p className='text-blue-500 text-4xl'>{maxFee}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-4 text-center justify-between'>
        <div className='items-center rounded-lg bg-black bg-opacity-70 w-full p-4 space-y-2'>
          <p className='text-white'>In 30 Seconds</p>
          <div className='flex'>
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
        <div className='items-center rounded-lg bg-black bg-opacity-70 w-full p-4 space-y-2'>
          <p className='text-white'>Later</p>
          <div className='flex'>
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
  )
}

export default EIP