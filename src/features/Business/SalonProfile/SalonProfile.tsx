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
import { useNavigate, useLocation } from "react-router-dom";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";
import moment from "moment";

export const SalonProfile = () => {
  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [membershipScreen, setMembershipScreen] = useState(false);
  const [subsctiptionDetails, setSubscriptionDetails] = useState<any>({});
  const showPaymentSuccess = location.pathname === "/business/payment-success";

  const navigate = useNavigate();

  function handleBtnClick() {
    setIsOpen(true);
  }
  function onSetActiveStep(value) {
    setActiveStep(value);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const goToBusinessPage = () => {
    navigate("/business");
  };

  const checkEstablishmentSubscriptionStatus = async () => {
    try {
      const response = await endpoint.checkSubscriptionStatus(
        userDetails?.establishmentId
      );

      setSubscriptionDetails(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkEstablishmentSubscriptionStatus();
  }, []);

  return (
    <>
      {showPaymentSuccess ? (
        <div className="w-full h-[500px] flex flex-col justify-center items-center ">
          {/* <img src="/paymentDone.png" alt="payment" className="w-[100px]" /> */}
          <img
            src="https://res.cloudinary.com/djoz0tmyl/image/upload/v1722526982/paymentDone_xtvutf.png"
            alt="payment"
            className="w-[100px]"
          />
          <h4 className="text-green-600 font-semibold mt-3">Payment Done!</h4>
          {/* <p className="text-gray-700 font-medium mt-1 text-base text-center">
            Thank you for completing your secure online payment. Have a great
            day!
          </p> */}

          <p className="text-yellow-700 font-semibold text-center text-xl mt-3">
            Your establishment has been published!
          </p>

          <button
            className="px-2 py-2 border-2 rounded bg-transparent border-green-600  text-gray-600 font-semibold mt-5"
            onClick={goToBusinessPage}
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          {membershipScreen ? (
            <div className="flex justify-center items-center flex-col w-full h-full sm:mt-1 sm:pt-1 md:mt-16  md:pt-16 px-2">
              <Membershp setMembershipScreen={setMembershipScreen} />
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
