import React, { useEffect, useState } from "react";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { WorkingHours } from "../SalonProfileSteps/BusinessInfo/WorkingHours";
import endpoint from "../../../../api/endpoints";
import { useSelector } from "react-redux";
import { useSnackbar } from "../../../../components/Snackbar";
import Membershp from "../SalonProfileSteps/BusinessInfo/Membershp";
import GetIcon from "../../../../assets/Icon/icon";
import { useNavigate } from "react-router-dom";
import Box  from "@mui/material/Box";
import moment from "moment";

export const FormStep5 = ({ setActiveStep }) => {
  const [open, setOpen] = React.useState(false);
  const [subsctiptionDetails, setSubscriptionDetails] = useState<any>({});
  const [membershipScreen, setMembershipScreen] = useState(false);
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const userDetails: any = useSelector((state: any) => {
    return state?.currentUserDetails;
  });

  const establishmentId: any =
    userDetails != null ? userDetails?.establishmentId : "";

  const checkEstablishmentSubscriptionStatus = async () => {
    try {
      const response = await endpoint.checkSubscriptionStatus(
        establishmentId
      );

      setSubscriptionDetails(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    checkEstablishmentSubscriptionStatus();
  }, []);

  const onClickCheckOut = () => {
    if (subsctiptionDetails && subsctiptionDetails?.active) {
      showSnackbar("Establishment already have Membership");
      setOpen((prev) => !prev);
      // navigate("/");
    } else {
      // setIsOpen(false);
      // setMembershipScreen(true);
    }
  };

  function onClickPreview() {
    navigate(
      `/salon/${userDetails != null ? userDetails?.establishmentId : ""}`
    );
  }

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };
  return (
    <>
      <section
        className="w-full flex  items-center flex-1 overflow-y-auto pt-32 flex-col"
        style={{ height: "80vh" }}
      >
        <div style={{ width: "40%" }}>
          <h5 className="text-sm mb-2.5">Step 5</h5>
          <h4 className="tetx-xl md:text-4xl tracking-wide mb-4 font-bold">
            Add Membership
          </h4>
          <h4 className="text-base md:text-base tracking-wide ml-2">
            Pick a best membership which suits your business
          </h4>
        </div>
        
          <div className="flex flex-col items-center justify-center w-full h-full px-2 sm:mt-1 sm:pt-1 md:mt-16 md:pt-8">
            <Membershp setMembershipScreen={setMembershipScreen} />
          </div>
          {/* <div className="flex justify-center">
            <div
              className={
                subsctiptionDetails?.active
                  ? "flex justify-center flex-col"
                  : "flex justify-center flex-col "
              }
            >
              <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
                <Box sx={{paddingX: 1}}>
                <Button
                  variant="outlined"
                  sx={styles.btn}
                  name={"Preview"}
                  onClick={() => onClickPreview()}
                ></Button></Box>
                <Box sx={{paddingX: 1}}><Button
                  variant="outlined"
                  sx={styles.btn}
                  name={
                    subsctiptionDetails?.active
                      ? "Membership Details"
                      : "Membership"
                  }
                  onClick={() => onClickCheckOut()}
                ></Button></Box>
              </div>
            </div>
          </div>

        <Modal
          open={open}
          onClose={handleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{}} className="rounded-3xl filter-box">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GetIcon
                onClick={() => {}}
                className="my-3 mx-16 p-1 cursor-pointer rounded-sm"
                iconName="CalendarConfirmedIcon"
              />

              <div id="title" className="font-bold text-3xl mb-3 text-blue-800">
                Dear {userDetails?.fullName}
              </div>

              <p className="text-yellow-800 font-semibold text-center text-base">
                Package Name : {subsctiptionDetails?.packageName}
              </p>
              <p className="text-gray-800 font-bold text-center italic">
                Valid till :{" "}
                {moment(subsctiptionDetails?.endDate).format("DD MMMM YYYY")}
              </p>
            </div>
          </Box>
        </Modal> */}
      </section>
      <footer
        className="w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white"
        style={{ height: "10vh" }}
      >
        <Button
          variant="text"
          size="large"
          
          sx={{ textTransform: "none", fontWeight: "bold", color: '#825FFF', fontSize: '18px' }}
          onClick={() => setActiveStep((prevStep) => prevStep - 1)}
        >
          Back
        </Button>
      </footer>
    </>
  );
};
const styles = {
  btn: {
    color: '#FFFFFF',
    backgroundColor: '#825FFF',
    fontWeight: 600,
    fontSize: '20px',
    padding: '10px 40px 10px 40px',
    borderRadius: '10px',
    whiteSpace: 'nowrap',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#5A3EBF',
    }
  },
}