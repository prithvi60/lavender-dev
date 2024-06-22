import { Dialog, Toolbar, Box, Stepper, Step, StepLabel, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CheckoutCard from '../../ServiceDialog/CheckoutCard';
import ConfirmScreen from '../../ServiceDialog/ConfirmScreeen';
import ScheduleAppointment from '../../ServiceDialog/ScheduleAppointment';
import ServiceListItems from '../../ServiceDialog/ServiceListItems';
import Buttons from '../../../components/Button'
import { SalonSetup } from './SalonSetup';

export const SalonProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  function handleBtnClick(){
      setIsOpen(true);
  }
  function onSetActiveStep(value) {
    setActiveStep(value);
  }

  function handleClose() {
    setIsOpen(false);
  }
  
  return (
    <>
    <div className='flex justify-center items-center flex-col w-full h-full '>
      <div className='text-5xl font-bold text-center w-9/12 p-4' style={{color: '#4D4D4D'}}>Setup your online Salon profile with Lavender</div>
      <div className='text-xl font-normal text-center w-9/12 p-4' style={{color: '#4D4D4D'}}>You have successfully completed the lavender business setup for your salon. Now you can use our platform to manage our businesses</div>
      <SalonSetup />
    </div>
        
    </>
  )
}
