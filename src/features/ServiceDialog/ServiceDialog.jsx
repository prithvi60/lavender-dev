import React, { useState } from "react";
import Buttons from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CheckoutCard from "./CheckoutCard";
import ServiceListItems from "./ServiceListItems";
import ScheduleAppointment from "./ScheduleAppointment.tsx";
import ConfirmScreen from "./ConfirmScreeen.tsx";
import { Grid } from "@mui/material";

function ServiceDialog({establishmentData}) {
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
  
  const steps = ["Pick services", "Schedule appointment", "Confirm"];
  return (
    <>
        <Buttons variant= 'outlined' onClick={handleBtnClick}>Services</Buttons>
        <Dialog fullScreen open={isOpen} close={handleClose}>
        <Toolbar className="mb-4 stepper-header">
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
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
        <div className="flex flex-wrap md:flex-nowrap h-full gap-6 mg:gap-0 max-w-7xl mx-auto py-4 px-6">
          <div className="w-full md:pr-8">

            {activeStep === 0 && <ServiceListItems serviceCategories={establishmentData?.categories}/>}

            {activeStep === 1 && <ScheduleAppointment estData={establishmentData} onSetActiveStep={onSetActiveStep} />}

            {activeStep === 2 && <ConfirmScreen estData={establishmentData} onSetActiveStep={onSetActiveStep} />}
          </div>

          <div>
            <CheckoutCard activeStep={activeStep} next={onSetActiveStep} establishmentName = {establishmentData?.profile?.establishmentName} establishmentId = {establishmentData?.data?.id}/>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ServiceDialog