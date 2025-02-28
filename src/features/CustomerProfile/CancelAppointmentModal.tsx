import { Card, Grid, IconButton, Modal, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import GetIcon from "../../assets/Icon/icon";
import Button from "../../components/Button";
import GetImage from "../../assets/GetImage";
import CloseIcon from "@mui/icons-material/Close";
import endpoint from "../../api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/Snackbar";

export const CancelAppointmentModal = ({
  bookings,
  userFlow,
  estsId
}) => {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const isMobile = useMediaQuery("(max-width:600px)");
  // console.log(userFlow);

  function handleCancelClick() {
    setIsCancelOpen((prev) => !prev);
  }

  function handleCancelApptClick(serviceId) {
    const payload = {
      id: bookings?.bookingId,
      appointmentServices: [
        {
          serviceId: serviceId,
          bookingStatus: "CANCELED",
        },
      ],
    };

    try {
      mutation.mutate(payload);
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  }

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await endpoint.cancelAppointment(payload);
      if (response?.data?.success) {
        showSnackbar("Items saved successfully.", "success");
        navigate(0);
      } else {
        showSnackbar(response?.data?.data, "error");
      }
      return response;
    },
    onError: (error) => {
      alert("Edit unsuccessful: " + error.message);
    },
  });

  function handleRescheduleClick() {
    userFlow !== "past" &&
      (navigate(`/salon/${estsId}/reschedule`, {
        replace: true,
      }))
  }

  const modalStyle = {
    position: "absolute",
    top: isMobile ? "auto" : "50%",
    left: isMobile ? "0" : "50%",
    bottom: isMobile ? "0" : "auto",
    transform: isMobile ? "none" : "translate(-50%, -50%)",
    width: isMobile ? "100%" : "90%",
    height: isMobile ? "70%" : "700px",
    maxHeight: isMobile ? "70%" : "95vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: isMobile ? "20px 20px 0 0" : 4,
    overflow: "hidden",
  };

  return (
    <div>
      <div
        aria-disabled="true"
        className={`flex items-center justify-end px-1.5 py-5 md:p-51`}
        onClick={handleCancelClick}
      >
        {userFlow === "past" ? (
          <GetIcon iconName="DisableCancelIcon" />
        ) : (
          <GetIcon iconName="CancelIcon" />
        )}

        <div
          className={`pl-1 text-[#4D4D4D] text-base ${userFlow === "past" ? "text-[#B3B3B3]" : "text-black cursor-pointer"
            }`}
        >
          Cancel
        </div>
      </div>
      {userFlow === "upcoming" && (
        <Modal
          open={isCancelOpen}
          onClose={handleCancelClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus={true}
        >
          <Card
            sx={modalStyle}
            className="max-[600px]:max-w-[100%] min-[601px]:max-w-[400px] min-[901px]:max-w-[900px]"
          >
            <div className="absolute top-4 right-4">
              <IconButton onClick={() => handleCancelClick()}>
                <CloseIcon />
              </IconButton>
            </div>
            <Grid
              container
              sx={{ padding: "20px", marginLeft: "-15px", marginTop: "0px" }}
              spacing={4}
              className="min-[900px]:flex max-[900px]:!hidden justify-center items-center"
              style={{ height: "100%" }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                sx={{ order: { xs: 1, sm: 2 }, padding: "4px" }}
              >
                <GetImage imageName="IllustrateDog" />
              </Grid>
              <Grid item xs={12} sm={8} sx={{ order: { xs: 2, sm: 1 } }}>
                <div>
                  <div
                    className="py-3 text-4xl font-bold"
                    style={{ color: "#333333" }}
                  >
                    Are you sure you want to cancel your appointment?
                  </div>
                  <div
                    className="py-3 text-lg font-normal"
                    style={{ color: "#333333" }}
                  >
                    Should your plans change, we encourage you to explore
                    rescheduling for a more suitable time.
                  </div>
                </div>
                <div className="flex justify-start pt-12 pb-4 sm:justify-between">
                  <div className="p-4">
                    <Button
                      sx={styles.btn}
                      variant="outlined"
                      name={"Yes, Cancel"}
                      onClick={() => {
                        handleCancelApptClick("SER00002514");
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <Button
                      sx={styles.btn}
                      name={"Reschedule"}
                      onClick={() => {
                        handleRescheduleClick();
                      }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
            <div className="flex min-[900px]:hidden flex-col items-center justify-between p-4 mt-6 w-full h-full">
              <h5
                className="py-3 text-2xl font-bold text-center"
                style={{ color: "#333333" }}
              >
                Are you sure you want to cancel your appointment?
              </h5>
              {/* <GetImage imageName="IllustrateDog" /> */}
              <img
                alt="illustration"
                src={require("../../assets/BackgroundImage/illustration_dog_2.png")}
                className="w-32 h-36"
              />
              <p
                className="py-3 text-base font-normal text-center"
                style={{ color: "#333333" }}
              >
                Should your plans change, we encourage you to explore
                rescheduling for a more suitable time.
              </p>
              <div className="flex justify-start pb-2 md:pt-12 md:pb-4 sm:justify-between">
                <div className="p-4">
                  <Button
                    sx={styles.btn}
                    variant="outlined"
                    name={"Yes, Cancel"}
                    onClick={() => {
                      handleCancelApptClick("SER00002514");
                    }}
                  />
                </div>
                <div className="p-4">
                  <Button
                    sx={styles.btn}
                    name={"Reschedule"}
                    onClick={() => {
                      handleRescheduleClick();
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Modal>
      )}
    </div>
  );
};

const styles = {
  btn: {
    color: "#FFFFFF",
    backgroundColor: "#825FFF",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "10px 40px 10px 40px",
    borderRadius: "10px",
    textTransform: "none",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: "#5A3EBF",
    },
    "@media (max-width: 540px)": {
      padding: "10px 20px 10px 20px",
    },
  },
};
