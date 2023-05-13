import React from 'react'
import CustomList from '../Components/Happening/CustomList'
import { Button } from 'flowbite-react'

function Happening() {

  const contracts = [
    { 'name': 'UniswapV2Router', 'Txs': 235 },
    { 'name': 'Peppa', 'Txs': 134 },
    { 'name': 'UniswapV2Router', 'Txs': 235 },
    { 'name': 'Peppa', 'Txs': 134 },
    { 'name': 'UniswapV2Router', 'Txs': 235 },
    { 'name': 'Peppa', 'Txs': 134 },
  ]

  const transactions = [
    { 'name': 'UniswapV2Router', 'Txs': 'hand' },
    { 'name': 'Peppa', 'Txs': 'hand' },
    { 'name': 'UniswapV2Router', 'Txs': 'hand' },
    { 'name': 'Peppa', 'Txs': 'hand' }, 
    { 'name': 'UniswapV2Router', 'Txs': 'hand' },
    { 'name': 'Peppa', 'Txs': 'hand' },
  ]

  return (
    <div className='mb-8'>
      <div className='md:flex gap-20 space-y-4 md:space-y-0'>
        <div className='w-full md:w-1/2'>
          <CustomList title='Trending Contracts (5 min)' items={contracts} />
        </div>
        <div className='w-full md:w-1/2'>
          <CustomList title='OpenSea Transactions' items={transactions} />
        </div>
      </div>
      <Button gradientDuoTone="cyanToBlue" className='mt-14 w-max mx-auto'>
        <span className="text-white md:text-[32px] text-2xl md:px-20 p-2">More Coming Soon</span>
      </Button>
    </div>
  )
}

export default Happening