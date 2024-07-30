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
import { SalonSetup } from "./SalonSetup";
import Text from "../../../components/Text";
import Membershp from "./SalonProfileSteps/BusinessInfo/Membershp";

export const SalonProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [membershipScreen, setMembershipScreen] = useState(false);

  function handleBtnClick() {
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
      {membershipScreen ? (
        <div className="flex justify-center items-center flex-col w-full h-full sm:mt-1 sm:pt-1 md:mt-16  md:pt-16 px-2">
          <Membershp />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-full h-full mt-12 pt-12">
          <div style={{ minHeight: "150px" }}></div>
          <Text
            sx={style.header}
            name={"Setup your online Salon profile with Lavender"}
          />
          <Text
            sx={style.subHeader}
            name={
              "You have successfully completed the lavender business setup for your salon. Now you can use our platform to manage our businesses"
            }
          />
          <SalonSetup setMembershipScreen={setMembershipScreen} />
        </div>
      )}
    </>
  );
};

const style = {
  header: {
    fontSize: "45px",
    fontWeight: 700,
    color: "#4D4D4D",
    lineHeight: "54px",
    padding: 1,
    maxWidth: "746px",
  },
  subHeader: {
    fontSize: "20px",
    fontWeight: 400,
    color: "#808080",
    lineHeight: "24px",
    padding: "8px 8px 20px 8px",
    maxWidth: "746px",
  },
};
