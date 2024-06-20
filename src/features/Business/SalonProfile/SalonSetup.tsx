import { Dialog, Toolbar, Box, Stepper, Step, StepLabel, IconButton } from '@mui/material'
import React, {useState} from 'react'
import CheckoutCard from '../../ServiceDialog/CheckoutCard'
import ConfirmScreen from '../../ServiceDialog/ConfirmScreeen'
import ScheduleAppointment from '../../ServiceDialog/ScheduleAppointment'
import ServiceListItems from '../../ServiceDialog/ServiceListItems'
import Buttons from '../../../components/Button'
import CloseIcon from "@mui/icons-material/Close";
import { BusinessInfo } from './SalonProfileSteps/BusinessInfo/BusinessInfo'
import { Photos } from './SalonProfileSteps/Photos'
import { AdditionalInfo } from './SalonProfileSteps/AdditionalInfo'
import { Publish } from './SalonProfileSteps/Publish'
import GetIcon from '../../../assets/Icon/icon'
import { useSelector } from 'react-redux'

export const SalonSetup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
  
    function handleBtnClick(){
        setIsOpen(true);
    }
    function onSetActiveStep(value) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    }
    const handleBack = () => {
        if(activeStep===0){
            setIsOpen(false);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
  
    function handleClose() {
      setIsOpen(false);
    }
  const steps = ["Business info", "Photos", "Additional info", "Publish"];
  
  const userDetails = useSelector((state) => {
    return state.currentUserDetails;
  });
  
  return (
    <div>
        <Buttons sx={{borderRadius: '10px', padding: '10px 40px 10px 40px'}} variant= 'contained' onClick={handleBtnClick} name={'Get started'}> </Buttons>
        <Dialog fullScreen open={isOpen} onClose={handleClose}>
        <Toolbar className="mb-4 stepper-header">
            <Box sx={{ width: '100%' }}>
                <IconButton
                color="inherit"
                onClick={handleBack}
                sx={{ mr: 1 }}
                >
                    <GetIcon iconName={'BackIcon'}/>
                </IconButton>

                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
            <Buttons sx={{borderRadius: '10px', padding: '10px 40px 10px 40px'}} variant= 'contained' onClick={onSetActiveStep} name={'Proceed'}> </Buttons>
        </Toolbar>
        <div className="flex flex-wrap md:flex-nowrap w-full h-full gap-6 mg:gap-0 max-w-7xl mx-auto py-4 px-6">
          <div className="w-full md:p-8">

            {activeStep === 0 && <BusinessInfo userDetails={userDetails}/>}

            {activeStep === 1 && <Photos />}

            {activeStep === 2 && <AdditionalInfo />}

            {activeStep === 3 && <Publish userDetails={userDetails}/>}
            
          </div>

        </div>
        </Dialog>

    </div>
  )
}
