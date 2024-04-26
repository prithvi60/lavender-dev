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
        <Toolbar className="mb-4">
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
                
            {/* <Buttons >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Buttons> */}
            <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            >
            <CloseIcon />
            </IconButton>
        </Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={7} md={7} lg={7}>

            {activeStep === 0 && <ServiceListItems serviceCategories={establishmentData.data.serviceCategories}/>}

            {activeStep === 1 && <ScheduleAppointment onSetActiveStep={onSetActiveStep} />}

            {activeStep === 2 && <ConfirmScreen onSetActiveStep={onSetActiveStep} />}
          </Grid>

          <Grid item xs={5} md={5} lg={5}>
            <CheckoutCard next={onSetActiveStep}/>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default ServiceDialog