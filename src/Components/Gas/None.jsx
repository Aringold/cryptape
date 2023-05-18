import React from 'react'

function None({ before, later,  fee}) {
  return (
    <div className='flex flex-col w-3/5 mx-auto space-y-2'>
      <div className='flex gap-4 text-center'>
        <div className='bg-black bg-opacity-70 w-full items-center p-4 rounded-lg space-y-2'>
          <p className='text-white'>In 30 Seconds</p>
          <p className='text-white text-4xl'>{before}</p>
        </div>
        <div className='bg-black bg-opacity-70 w-full items-center p-4 rounded-lg space-y-2'>
          <p className='text-white'>Later</p>
          <p className='text-white text-4xl'>{later}</p>
        </div>
      </div>
      <div>
        <div className='text-center bg-black bg-opacity-70 p-4 rounded-lg space-y-2'>
          <p className='text-white'>Now (Next Block)</p>
          <p className='text-blue-500 text-4xl'>{fee}</p>
        </div>
      </div>
    </div>
  )
}

export default None