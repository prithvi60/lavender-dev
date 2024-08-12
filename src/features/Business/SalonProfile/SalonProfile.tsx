
import  { useEffect, useState } from "react";
import { SalonSetup } from "./SalonSetup";
import Text from "../../../components/Text";
import Membershp from "./SalonProfileSteps/BusinessInfo/Membershp";
import { useNavigate, useLocation } from "react-router-dom";
import endpoint from "../../../api/endpoints";
import { useSelector } from "react-redux";
import { PublishedSalonProfile } from "./PublishedSalonProfile";

export const SalonProfile = () => {
  const userDetails = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId =
    userDetails != null ? userDetails?.establishmentId : "";

  const location = useLocation();
  const navigate = useNavigate();

  // const [isOpen, setIsOpen] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
  const [subsctiptionDetails, setSubscriptionDetails] = useState<any>({});
  const [membershipScreen, setMembershipScreen] = useState(false);
  const showPaymentSuccess = location.pathname === "/business/payment-success";
  const [basicInfo, setBasicInfo] = useState([]);
  const [isPublished, setIsPublished] = useState(false);
  const [imageId, setImageId] = useState([]);
  const [lastModified, setLastModified] = useState();

  // function handleBtnClick() {
  //   setIsOpen(true);
  // }
  // function onSetActiveStep(value) {
  //   setActiveStep(value);
  // }

  // function handleClose() {
  //   setIsOpen(false);
  // }

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

    const getEstablishmentDetails = async () => {
      const establishmentData = await endpoint.getEstablishmentDetailsById(
        establishmentId
      );
      if (establishmentData?.data?.success) {
        setBasicInfo(establishmentData?.data?.data?.profile);
        setIsPublished(establishmentData?.data?.data?.published);
        setImageId(establishmentData?.data?.data?.estImages)
        setLastModified(establishmentData?.data?.data?.lastModifiedDate)
      }
    };

    getEstablishmentDetails();
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
          ) : ( isPublished ? (
            <>
              <PublishedSalonProfile estImages={imageId} basicInfo={basicInfo} lastModified={lastModified}/>
              <div className="mt-6 md:mt-0">
                <SalonSetup setMembershipScreen={setMembershipScreen} />
              </div>
            </>
          ):(
            <div className="flex justify-center items-center flex-col w-full h-full mt-12 pt-12 space-y-6 md:space-y-0">
              <div style={{ minHeight: "150px" }}></div>
              <Text
                sx={{
                  ...style.header,
                  marginBottom: { xs: '24px', md: '0' }
                }}
                name={"Setup your online Salon profile with Lavender"}
              />
              <Text
                sx={{
                  ...style.subHeader,
                  marginBottom: { xs: '24px', md: '0' }
                }}
                name={
                  "You have successfully completed the lavender business setup for your salon. Now you can use our platform to manage our businesses"
                }
              />
              <div className="mt-6 md:mt-0">
                <SalonSetup setMembershipScreen={setMembershipScreen} />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

const style = {
  header: {
    fontSize: { xs: "32px", sm: "38px", md: "45px" },
    fontWeight: 700,
    color: "#4D4D4D",
    lineHeight: { xs: "40px", sm: "48px", md: "54px" },
    padding: { xs: 2, sm: 1 },
    maxWidth: "100%",
    textAlign: { xs: "center", md: "left" },
  },
  subHeader: {
    fontSize: { xs: "16px", sm: "18px", md: "20px" },
    fontWeight: 400,
    color: "#808080",
    lineHeight: { xs: "20px", sm: "22px", md: "24px" },
    padding: { xs: "8px 20px 20px", sm: "8px 12px 20px 12px" },
    maxWidth: "100%",
    textAlign: { xs: "center", md: "left" },
  },
};
