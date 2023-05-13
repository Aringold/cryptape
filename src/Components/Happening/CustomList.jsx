import React from 'react';
import { FaHandPaper } from 'react-icons/fa'

function CustomList({ title, items }) {
  return (
    <div className='w-full'>
      <div className='rounded-t-2xl bg-[#121920] text-center'>
        <p className='text-white py-4'>{title}</p>
      </div>
      < ul className="" >
        <li className='bg-[#070B0F] py-4'>
          <div className='flex items-center justify-between px-8'>
            <p className="text-white">Name</p>
            <p className="text-white">Txs</p>
          </div>
        </li>
        {
          items.map((item, index) => (
            <li
              key={index}
              className={`py-4 ${index % 2 === 0 ? 'bg-[#121920]' : 'bg-[#070B0F]'}`}
            >
              <div className='flex items-center justify-between px-8'>
                <p className="text-white">{item.name}</p>
                {
                  item.Txs === 'hand' ?
                  <FaHandPaper color="white" />
                  :
                  <p className="text-white">{item.Txs}</p>
                }
              </div>
            </li>
          ))
        }
      </ul >
    </div>
  );
}

export default CustomList;