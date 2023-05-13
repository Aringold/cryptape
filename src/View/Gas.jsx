import React, { useState } from 'react'
import { ToggleSwitch, Button } from 'flowbite-react'
import Advance from '../Components/Gas/Advance';
import Both from '../Components/Gas/Both';
import None from '../Components/Gas/None';
import EIP from '../Components/Gas/EIP';

function Gas() {

  const [isEIP, setIsEIP] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <div className='h-[100vh]'>
      <div className='flex gap-8 w-max mx-auto mt-8'>
        <div className='flex items-center'>
          <ToggleSwitch
            className='text-white'
            checked={isEIP}
            onChange={() => setIsEIP(!isEIP)}
          />
          <p className='text-white'>EIP-1559</p>
        </div>
        <div className='flex items-center'>
          <ToggleSwitch
            className='text-white'
            checked={isAdvanced}
            onChange={() => setIsAdvanced(!isAdvanced)}
          />
          <p className='text-white'>Advance</p>
        </div>
      </div>
      <div className='mx-auto mt-3'>
        {
          isEIP ?
            (isAdvanced ?
              <Both block={17161936} minimum={1} overPay={2} fee={1} baseFee={116.67} txCount={73} gasUsed={8301001} beforePriorityFee={1} beforeMaxFee={110} laterPriorityFee={1} laterMaxFee={98} maxFee={188} />
              :
              <EIP priorityFee={1} maxFee={120} beforePriorityFee={1} beforeMaxFee={110} laterPriorityFee={1} laterMaxFee={98} />
            )
            :
            (
              isAdvanced ?
                <Advance block={17161936} minimum={1} overPay={2} fee={1} baseFee={116.67} txCount={73} gasUsed={8301001} before={41} later={46} />
                :
                <None before={69} later={65} fee={78} />
            )
        }
      </div>
      <Button gradientDuoTone="cyanToBlue" className='mt-10 text-center mx-auto'>
        <span className="text-white md:text-[32px] text-2xl md:p-4 p-2">Download Chrome Extension</span>
      </Button>
      <div className='w-2/3 bg-blue-500 bg-opacity-40 mx-auto mt-16'>
        <p className='text-white p-4'>
          CRYPTAPE simulates the next 3 blocks in real time, using pending transactions. These simulations allow for the most accurate gas price predictions. Depending on the fluctuating base fee, the second and third block may have higher fees than the first. It's recommended to use the large green values, however if there is a gas war and you need an instant confirmation, you might consider overpaying.
        </p>
      </div>
    </div>
  )
}

export default Gas