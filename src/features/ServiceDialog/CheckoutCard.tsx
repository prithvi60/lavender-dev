import React, { useEffect, useState } from "react";
import { Button, Box, Tooltip, Skeleton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints";
import AppointmentConfimed from "./AppointmentConfimed";
import { UpdateCheckoutInfo, UpdateSelectedDate, UpdateTimeOfDayAndTime } from "../../store/slices/Booking/ScheduleAppoinmentSlice";
import Text from "../../components/Text";
import { add30Minutes, calculateEndTime, convertDateToReadAbleDate } from "../../utils/TimeFormat";
import GetIcon from "../../assets/Icon/icon";
import DatePicker from "../../components/DateInput";
import { TimeOfDay } from "../../api/type";

function CheckoutCard(props: any) {
  const { activeStep, next, establishmentData, establishmentId,time } = props;
  const establishmentName = establishmentData?.profile?.establishmentName;
  const dispatch = useDispatch();
  const checkOutList = useSelector((state: any) => state?.checkOutPage);
  const scheduleAppoinmentList = useSelector((state: any) => state?.ScheduleAppoinment);
  const quickBook = useSelector((state: any) => state?.quickBook);
  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  
  useEffect(()=>{
    if(quickBook?.selectDate){
      console.log('in check')
      dispatch(UpdateSelectedDate({ selectedDate: quickBook?.selectDate }));
      dispatch(
        UpdateTimeOfDayAndTime({
          TimeOfDay: TimeOfDay['Morning'],
          startTime: quickBook?.selectedTime,
          endTime: calculateEndTime(quickBook?.selectedTime, scheduleAppoinmentList?.totalDuration)
        })
      );
    }
  },[quickBook])

  useEffect(() => {
    if (checkOutList?.checkOut?.length > 0) {
      setDisabled(false);
      calculateTotals();
    } else {
      setTotalPrice(0);
      setTotalDuration(0);
      setTotalServices(0);
    }
  }, [checkOutList]);

  useEffect(() => {
    if (activeStep >= 1) setDisabled(true);
  }, [activeStep]);

  useEffect(() => {
    if (activeStep >= 1 && scheduleAppoinmentList?.startTime) {
      setDisabled(false);
    }
  }, [activeStep, scheduleAppoinmentList]);

  useEffect(() => {
    if (activeStep < 1 && checkOutList?.checkOut?.length > 0) {
      setDisabled(false);
    }
  }, [activeStep, checkOutList]);

  function calculateTotals() {
    let totalPriceSum = 0;
    let totalDurationSum = 0;
    for (let item of checkOutList?.checkOut) {
      totalPriceSum += parseFloat(item?.finalPrice) || 0;
      totalDurationSum += parseInt(item?.serviceDuration) || 0;
    }
    setTotalPrice(totalPriceSum);
    setTotalDuration(totalDurationSum);
    setTotalServices(checkOutList?.checkOut.length);
  }

  dispatch(
    UpdateCheckoutInfo({
      totalPrice: totalPrice,
      totalDuration: totalDuration,
    })
  );

  function sendDataToParent() {
    next((prevActiveStep) => prevActiveStep + 1);
  }

  // const {
  //   data: establishmentData,
  //   isLoading: isLoading,
  //   error: userDataError,
  //   refetch: refetchUserData,
  // } = useQuery({
  //   queryKey: ["query-establishment-details"],
  //   queryFn: () => {
  //     return endpoint.getEstablishmentDetailsById(establishmentId);
  //   },
  // });

  useEffect(() => {
    setImageIdList(establishmentData?.estImages);
    setEmployee(establishmentData?.employees);
  }, [establishmentData]);

  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(
        image,
        establishmentId
      );

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callFetchImageApi = async () => {
      const urls = [];
      for (const imageId of imageIdList) {
        const imageUrl = await fetchImage(imageId);
        urls.push(imageUrl);
      }
      setImageUrls(urls);
      setLoading(false);
    };
    if (imageIdList?.length > 0) {
      callFetchImageApi();
    }
  }, [imageIdList]);

  useEffect(() => {
    const employeeName: any = employee?.find(
      (item) => item?.employeeId === scheduleAppoinmentList?.id
    );
    //setEmployee(employeeName)
    setEmployeeName(employeeName?.employeeName);
  }, [employee, scheduleAppoinmentList?.id]);

  const btnStyle = {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    mstransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="my-6 ml-5 md:mx-5 urbanist-font rounded-2xl chackout-card-container h-fit">
      {" "}
      {/* Adjusted width to be responsive */}
      <div className="px-3 py-2 rounded-md shadow-none min-w-80">
        <Box
          className="flex justify-between w-full gap-2 pb-2 my-2 serviceCardDetail"
          sx={{
            "@media (max-width: 500px)": {
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            },
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"120px"}
              className="m-0.5 rounded-lg max-w-52 h-28"
              sx={{ borderRadius: "20px" }}
            />
          ) : (
            <img
              alt=""
              className="establishmentImageCls max-w-52 h-28"
              src={imageUrls[0]}
              style={{ width: "350px", height: "120px", margin: "10px" }}
            />
          )}

          {/* <Text sx={styles.subHeading} name={establishmentName} className="w-full" /> */}
          <h4 className="w-full p-1.5 mt-3 font-semibold text-lg">
            {establishmentName}
          </h4>
          {/* </Box> */}

        </Box>

        {scheduleAppoinmentList?.startTime && (
          <Box

            sx={{ display: "flex", }}
            className="px-1 basis-full md:basis-4/5"

          >
            {activeStep !== 0 &&
              scheduleAppoinmentList?.selectedDate &&
              typeof scheduleAppoinmentList?.selectedDate === "string" && (
                <Box sx={{ display: "flex", paddingRight: 2 }}>
                  <Box>
                    <GetIcon iconName="CalendarIcon" />
                  </Box>
                  <Box
                    sx={{
                      paddingLeft: 1,
                      color: "#4D4D4D",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    {convertDateToReadAbleDate(
                      scheduleAppoinmentList?.selectedDate
                    )}
                  </Box>
                </Box>
              )}
            <Box sx={{ display: "flex" }}>
              <GetIcon iconName="AccessTimeFilledIcon" />
              <Box
                sx={{
                  paddingLeft: 1,
                  color: "#4D4D4D",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >{`${scheduleAppoinmentList?.startTime}-${scheduleAppoinmentList?.endTime}`}</Box>
            </Box>
          </Box>
        )}

        {scheduleAppoinmentList?.startTime && employeeName && (
          <Box sx={{ display: "flex", paddingTop: 2 }}>
            <GetIcon iconName="PersonIcon" />
            <Box
              sx={{
                paddingLeft: 1,
                color: "#4D4D4D",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              {employeeName}
            </Box>
          </Box>
        )}

        <div className="py-2 overflow-auto checkout-card">
          {checkOutList.checkOut.map((item, index) => (
            <div className="py-2">
              <div className="flex justify-between py-1" key={index}>
                <Text
                  sx={styles.serviceName}
                  name={item?.serviceName}
                  align="left"
                />
                <Text
                  sx={styles.startingPrice}
                  name={`$${item.finalPrice}`}
                  align="right"
                />
              </div>
              <Text
                sx={styles.duration}
                name={`${item.serviceDuration} mins`}
                align="left"
              />
            </div>
          ))}
        </div>
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
        {
          // checkOutList.checkOut.length > 0 &&
          <div className="pt-3">
            <div className="flex justify-between">
              <div className="text-lg font-bold">Total</div>
              <Text
                sx={{ fontSize: "20px", fontWeight: 600, color: "#000000" }}
                name={`$${totalPrice}`}
                align="right"
              />
            </div>

            <div
              className="pb-2 text-sm font-normal"
              style={{ color: "#808080" }}
            >
              excluding Tax
            </div>
            <div
              className="pb-2 text-sm font-normal"
              style={{ color: "#808080" }}
            >
              {totalDuration} mins
            </div>

            <div className="flex justify-center py-2">
              {activeStep < 2 ? (
                <Tooltip
                  title={disabled ? "Please select to proceed" : null}
                  arrow
                >
                  <div style={{ width: "100%" }}>
                    <Button
                      disabled={disabled}
                      className="w-full"
                      onClick={() => sendDataToParent()}
                      sx={styles.btn}
                      variant="contained"
                    >
                      Proceed
                    </Button>
                  </div>
                </Tooltip>
              ) : (
                <AppointmentConfimed
                  establishmentId={establishmentId}
                  activeStep={activeStep}
                  time={time}
                />
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default CheckoutCard;

const styles = {
  subHeading: {
    color: "#4D4D4D",
    fontSize: "20px",
    fontWeight: 600,
    // paddingLeft: 0,
    // paddingTop: 1,
    // width: "210px",
  },
  serviceName: {
    color: "#4D4D4D",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "24px",
    py: "1px",
  },
  startingPrice: {
    color: "#4D4D4D",
    fontSize: "20px",
    fontWeight: 600,
    py: "1px",
  },
  duration: {
    color: "#808080",
    fontSize: "16px",
    fontWeight: 400,
    py: "1px",
  },
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