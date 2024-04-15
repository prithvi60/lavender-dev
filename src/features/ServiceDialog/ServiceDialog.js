import React, { useState } from 'react'
import Buttons from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ServiceListItems from './ServiceListItems';

function ServiceDialog() {
    const [isOpen, setIsOpen] = useState(false);

    function handleBtnClick(){
        setIsOpen(true);
    }
    function handleClose(){
        setIsOpen(false);
    }
    const steps = [
        'Pick services',
        'Schedule appointment',
        'Confirmaay',
      ];
  return (
    <>
        <Buttons variant= 'outlined' onClick={handleBtnClick}>Services</Buttons>
        <Dialog fullScreen open={isOpen} close={handleClose}>
                <Toolbar>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={0} alternativeLabel>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <ServiceListItems/>
            
        </Dialog>
    </>
  )
}

export default ServiceDialog