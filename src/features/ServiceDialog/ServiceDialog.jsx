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
import CheckoutCard from "./CheckoutCard.tsx";
import ServiceListItems from "./ServiceListItems";
import ScheduleAppointment from "./ScheduleAppointment.tsx";
import ConfirmScreen from "./ConfirmScreeen.tsx";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCheckOutDetails } from "../../store/slices/checkOutPageSlice.js";
import { resetFilter } from "../../store/slices/Booking/ScheduleAppoinmentSlice.ts";
import CheckoutFooterCard from "./CheckoutFooterCard.tsx";

function ServiceDialog({ establishmentData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const dispatch = useDispatch();

  function handleBtnClick() {
    setIsOpen(true);
  }
  function onSetActiveStep(value) {
    setActiveStep(value);
  }

  function handleClose() {
    setIsOpen(false);
    dispatch(removeCheckOutDetails());
    dispatch(resetFilter());
    setActiveStep(0);
  }

  const steps = ["Pick services", "Schedule appointment", "Confirm"];
  return (
    <>
      <Buttons
        sx={styles.btn}
        variant="outlined"
        id="ServicesHeaderButton"
        onClick={handleBtnClick}
      >
        Services
      </Buttons>
      <Dialog id="ServicesHeaderButton" fullScreen open={isOpen} close={handleClose}>
        <Toolbar className="mb-4 stepper-header">
          <Box sx={{ width: "100%" }}>
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
        <div
          className="flex justify-between h-full gap-3 mx-2 xl:gap-5 md:max-w-7xl card-flex p-[15px] md:px-[24px] md:py-[30px] overflow-hidden"
          // style={{ padding: "24px 30px" }}
        >
          <Box
            sx={{
              "@media (max-width: 1023px)": {
                width: "100%",
              },
              "@media (min-width: 1024px)": {
                width: "65%",
              },
            }}
          >
            {activeStep === 0 && (
              <ServiceListItems
                serviceCategories={establishmentData?.categories}
                handleClose={handleClose}
              />
            )}

            {activeStep === 1 && (
              <ScheduleAppointment
                estData={establishmentData}
                onSetActiveStep={onSetActiveStep}
              />
            )}

            {activeStep === 2 && (
              <ConfirmScreen onSetActiveStep={onSetActiveStep} />
            )}
          </Box>
          {!isMobile ? (
            <Box
              sx={{
                "@media (max-width: 1023px)": {
                  width: "100%",
                },
                "@media (min-width: 1024px)": {
                  width: "35%",
                },
              }}
            >
              <CheckoutCard
                activeStep={activeStep}
                next={onSetActiveStep}
                establishmentName={
                  establishmentData?.profile?.establishmentName
                }
                establishmentId={establishmentData?.id}
              />
            </Box>
          ) : (
            <Box
              sx={{
                "@media (max-width: 1023px)": {
                  width: "100%",
                },
                "@media (min-width: 1024px)": {
                  width: "35%",
                },
              }}
            >
              <CheckoutFooterCard
                activeStep={activeStep}
                next={onSetActiveStep}
                establishmentName={
                  establishmentData?.profile?.establishmentName
                }
                establishmentId={establishmentData?.id}
              />
            </Box>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default ServiceDialog;

const styles = {
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#825FFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "10px 20px 10px 20px",
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A3EBF",
    },
  },
};
