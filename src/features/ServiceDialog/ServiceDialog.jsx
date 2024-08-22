import React, { useEffect, useState } from "react";
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
import { getEstablishmentData } from "../../store/slices/businessSlice.js";
import { useParams } from "react-router-dom";
import endpoint from "../../api/endpoints.ts";
import { useNavigate } from "react-router-dom";
import { resetquickBook } from "../../store/slices/quickbookSlice.js";
import GetIcon from "../../assets/Icon/icon.tsx";

function ServiceDialog() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [establishmentData, setEstablishmentData] = useState([]);

  const dispatch = useDispatch();
  const { estId } = useParams();
  const navigate = useNavigate();

  // function handleBtnClick() {
  //   setIsOpen(true);
  // }
  function onSetActiveStep(value) {
    setActiveStep(value);
  }

  function handleClose() {
    setIsOpen(false);
    navigate(-1);
    dispatch(removeCheckOutDetails());
    dispatch(resetFilter());
    dispatch(resetquickBook());
    setActiveStep(0);
  }

  const steps = ["Pick services", "Schedule appointment", "Confirm"];

  useEffect(()=>{
    const getEstablishmentDetails = async () => {
      const establishmentData = await endpoint.getEstablishmentDetailsById(
        estId
      );
      if (establishmentData?.data?.success) {
        setEstablishmentData(establishmentData?.data?.data)
      }
    };
    getEstablishmentDetails();
  },[])

  return (
    <>
      {/* <Buttons
        sx={styles.btn}
        variant="outlined"
        id="ServicesHeaderButton"
        onClick={handleBtnClick}
      >
        Services
      </Buttons> */}
      <Dialog id="ServicesHeaderButton" fullScreen open={isOpen} close={handleClose}>
        <Toolbar className="mb-4 stepper-header">
          {isMobile ? (<GetIcon
            className="cursor-pointer nav-bar-title"
            align="left"
            onClick={() => navigate("/")}
            iconName="LavenderLogo"
          />) : (<GetIcon
            className="cursor-pointer nav-bar-title"
            align="left"
            onClick={() => navigate("/")}
            iconName="LavenderFullLogo"
          />)}
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
          className="flex justify-between h-full gap-3 mx-2 xl:gap-5 md:max-w-7xl card-flex p-[15px] md:px-[24px] md:py-[30px]"
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
                // establishmentName={
                //   establishmentData?.profile?.establishmentName
                // }
                establishmentData={establishmentData}
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
