import {
  Dialog,
  Toolbar,
  Box,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutCard from "../../ServiceDialog/CheckoutCard";
import ConfirmScreen from "../../ServiceDialog/ConfirmScreeen";
import ScheduleAppointment from "../../ServiceDialog/ScheduleAppointment";
import ServiceListItems from "../../ServiceDialog/ServiceListItems";
import Buttons from "../../../components/Button";
import CloseIcon from "@mui/icons-material/Close";
import { BusinessInfo } from "./SalonProfileSteps/BusinessInfo/BusinessInfo";
import { Photos } from "./SalonProfileSteps/Photos";
import { AdditionalInfo } from "./SalonProfileSteps/AdditionalInfo";
import { Publish } from "./SalonProfileSteps/Publish";
import GetIcon from "../../../assets/Icon/icon";
import { useSelector } from "react-redux";
import endpoint from "../../../api/endpoints";
import Membershp from "./SalonProfileSteps/BusinessInfo/Membershp";

export const SalonSetup = ({ setMembershipScreen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Business info", "Photos", "Additional info", "Publish"];

  const [basicInfo, setBasicInfo] = useState();
  const [availableDays, setAvailableDays] = useState([]);
  const [features, setFeatures] = useState();
  const [paymentTypes, setPaymentTypes] = useState();
  const [languages, setLanguages] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId =
    userDetails != null ? userDetails?.establishmentId : "";

  function handleBtnClick() {
    setIsOpen(true);
    setActiveStep(0);
  }

  function onSetActiveStep(value) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }
  const handleBack = () => {
    if (activeStep === 0) {
      setIsOpen(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      const establishmentData = await endpoint.getEstablishmentDetailsById(
        establishmentId
      );
      if (establishmentData?.data?.success) {
        setBasicInfo(establishmentData?.data?.data?.profile);
        setAvailableDays(establishmentData?.data?.data?.availableDays);

        setFeatures(establishmentData?.data?.data?.features);
        setPaymentTypes(establishmentData?.data?.data?.paymentTypes);
        setLanguages(establishmentData?.data?.data?.languages);
        setIsPublished(establishmentData?.data?.data?.published);
      }
    };

    getEstablishmentDetails();
  }, [isOpen]);

  useEffect(() => {
    if (isPublished) {
      handleBtnClick();
    }
  }, [isPublished]);

  useEffect(() => {
    if (activeStep >= 3) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [activeStep]);

  return (
    <div>
      <Buttons
        sx={{
          borderRadius: "10px",
          padding: "10px 40px 10px 40px",
          width: "180px",
          height: "55.5px",
        }}
        variant="contained"
        onClick={() => handleBtnClick()}
        name={"Get started"}
      >
        {" "}
      </Buttons>
      <Dialog fullScreen open={isOpen} onClose={handleClose}>
        <Toolbar className="mb-4 stepper-header">
          <Box sx={{ width: "100%" }}>
            <IconButton color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              <GetIcon iconName={"BackIcon"} />
            </IconButton>

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {!(activeStep >= 3) && (
            <Buttons
              disabled={disabled}
              sx={{
                borderRadius: "10px",
                padding: "10px 40px 10px 40px",
                textTransform: "none",
                fontSize: "18px",
                fontWeight: 600,
              }}
              variant="contained"
              onClick={onSetActiveStep}
              name={"Proceed"}
            >
              {" "}
            </Buttons>
          )}
        </Toolbar>
        <div className="flex flex-wrap md:flex-nowrap w-full h-full gap-6 mg:gap-0 max-w-7xl mx-auto py-4 px-6">
          <div className="w-full md:p-8">
            {activeStep === 0 && (
              <BusinessInfo
                userDetails={userDetails}
                basicInfo={basicInfo}
                availableDays={availableDays}
              />
            )}

            {activeStep === 1 && <Photos userDetails={userDetails} />}

            {activeStep === 2 && (
              <AdditionalInfo
                userDetails={userDetails}
                languages={languages}
                paymentTypes={paymentTypes}
                features={features}
              />
            )}

            {activeStep === 3 && (
              <Publish
                userDetails={userDetails}
                setIsOpen={setIsOpen}
                setMembershipScreen={setMembershipScreen}
              />
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};
