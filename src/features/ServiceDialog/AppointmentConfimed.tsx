import { Modal, Divider, Slider, Avatar, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import endpoint from "../../api/endpoints";
import GetIcon from "../../assets/Icon/icon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SaveAppoinment } from "../../interface/interface";
import { convertToDateTime, convertToISO8601 } from "../../utils/TimeFormat";
import { resetFilter } from "../../store/slices/Booking/ScheduleAppoinmentSlice";
import { removeCheckOutDetails } from "../../store/slices/checkOutPageSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px",
  boxShadow: 24,
  p: 4,
  borderradius: "2px",
};

const AppointmentConfimed = ({ establishmentId, activeStep, time }) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const navigate = useNavigate();
  const checkOutList = useSelector((state: any) => state.checkOutPage);

  const {
    selectedDate,
    timeOfDay,
    startTime,
    endTime,
    id,
    payAtVenue,
    tncAgree,
    promotionAgree,
    serviceNotes,
  } = useSelector((state: any) => state.ScheduleAppoinment);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  const userDetails = useSelector((state: any) => {
    return state.currentUserDetails;
  });

  async function saveAppointmentClick() {
    if (activeStep === 2) {
      const modifiedStartTime = convertToDateTime(startTime, selectedDate);
      const modifiedEndTime = convertToDateTime(endTime, selectedDate);

      const payLoad = {
        appointmentBooking: {
          establishmentId: establishmentId,
          id: "",
          createdDate: new Date(),
          createdBy: "",
          lastModifiedDate: new Date(),
          lastModifiedBy: "",
          customerId: userDetails?.userId,
          bookedBy: "",
          bookingTime: new Date(),
          totalDuration: checkOutList.checkOut[0].duration,
          totalCost: checkOutList.checkOut[0].finalPrice,
          appointmentServices: [],
          paymentInfo: {
            payAtVenue: payAtVenue,
            cardStoreId: "string",
            paymentStatus: "string",
            paymentTxnId: "string",
          },
        },
        currency: "USD",
        paymentMode: "ONLINE",
      };

      const appointmentServices = checkOutList.checkOut.map((item) => ({
        serviceId: item.serviceId,
        optionId: item.optionId,
        serviceNotes: serviceNotes,
        employeeId: id,
        serviceCost: item.finalPrice,
        bookingStatus: "confirmed",
        startTime: modifiedStartTime,
        endTime: modifiedEndTime,
        review: {
          serviceRating: 0,
          reviewDate: "",
          publicComments: "",
          privateComments: "",
        },
      }));

      // Assign the dynamically populated appointmentServices to payload
      payLoad.appointmentBooking.appointmentServices = appointmentServices;

      const appointmentBooking =
        await endpoint.makeCustomerSubscriptionInitiate(payLoad);

      // setOpen((prev) => !prev);

      if (appointmentBooking.status === 200) {
        dispatch(resetFilter());
        dispatch(removeCheckOutDetails());
        window.location.replace(appointmentBooking.data.data);
      }
    }
  }

  useEffect(() => {
    if (tncAgree) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [tncAgree]);

  return (
    <>
      {time === "reschedule" ? (<Button
        fullWidth
        disabled={disabled}
        className="w-full"
        onClick={() => saveAppointmentClick()}
        sx={styles.btn}
        variant="contained"
      >
        Reschedule
      </Button>) : (<Button
        fullWidth
        disabled={disabled}
        className="w-full"
        onClick={() => saveAppointmentClick()}
        sx={styles.btn}
        variant="contained"
      >
        Proceed
      </Button>)}

      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={style} className="rounded-3xl filter-box">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GetIcon
              onClick={() => { }}
              className="p-1 mx-16 my-5 rounded-sm cursor-pointer"
              iconName="CalendarConfirmedIcon"
            />
            {
              userDetails?.fullName ? (
                <div id="title" className="mb-3 text-xl font-bold">
                  Dear {userDetails?.fullName}
                </div>
              )
                :
                (
                  <Skeleton animation="wave" />
                )
            }

            <div>Your appointment has been confirmed</div>
          </div>
          <Grid container spacing={2} className="filters-container">
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentConfimed;

const styles = {
  btn: {
    padding: "10px, 16px, 10px, 16px",
    borderRadius: "10px",
    textTransform: "none",
    fontSize: "20px",
    fontWeight: 500,
    display: "flex",
    justifyContent: "center",
  },
};
