import React from 'react'
import Buttons from '../../../../components/Button'

export const Publish = () => {
  return (
    <div className='w-full'>
        <div className='flex justify-center'>
            <img style={{width:'400px', height: '220px', alignContent: 'center'}} src={'../../../../assets/SaloonImage/Saloon.png'}/>
        </div>
        <div className='text-5xl font-bold text-center p-4' style={{color: '#4D4D4D'}}>Lee Chow Salon’s online profile is created</div>
        <div className='text-xl font-normal text-center p-4' style={{color: '#4D4D4D'}}>You can publish now to make it available for everyone</div>

        <div className='flex justify-center'>
        <div className='flex justify-center flex-col w-36'>
            <Buttons fullWidth variant="contained" sx={{borderRadius: '10px', padding: '10px 40px 10px 40px', marginBottom: '10px'}} name={'Publish'}></Buttons>
            <Buttons  variant="outlined" sx={{borderRadius: '10px', padding: '10px 40px 10px 40px'}} name={'Preview'}></Buttons>
        </div>
        </div>
        
        </div>
  )
}
