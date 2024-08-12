import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,

  Button,
  Box
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints";
import { UpdateCheckoutInfo } from "../../store/slices/Booking/ScheduleAppoinmentSlice";
import Text from "../../components/Text";


function CheckoutFooterCard(props) {
  const { activeStep, next, establishmentName, establishmentId } = props;

  const dispatch = useDispatch();
  const checkOutList = useSelector((state: any) => state.checkOutPage);

  const scheduleAppoinmentList = useSelector(
    (state: any) => state.ScheduleAppoinment
  );

  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [totalServices, setTotalServices] = useState(0);
  useEffect(() => {
    if (checkOutList?.checkOut?.length > 0) {
      setDisabled(false);
      calculateTotals();
      // calculateTotalPrice();
      // calculateTotalDuration();
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
  }, [scheduleAppoinmentList]);
  function calculateTotals() {
  let totalPriceSum = 0;
  let totalDurationSum = 0;
  for (let item of checkOutList?.checkOut) {
    totalPriceSum += item?.finalPrice;
    totalDurationSum += item?.duration;
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

  const btnStyle = {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    mstransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
  };

  function sendDataToParent() {
    next((prevActiveStep) => prevActiveStep + 1); // Invoke the callback function with data
  }

  const {
    data: establishmentData,
    isLoading: isLoading,
    error: userDataError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["query-establishment-details"],
    queryFn: () => {
      return endpoint.getEstablishmentDetailsById(establishmentId);
    },
  });

  useEffect(() => {
    setImageIdList(establishmentData?.data?.data?.estImages);
    setEmployee(establishmentData?.data?.data?.employees)
  }, [establishmentData]);

  const fetchImage = async (image) => {
    try {
      setLoading(true);
      const response = await endpoint.getImages(
        image,
        establishmentData?.data?.data?.id
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

  useEffect(()=> {
    
    const employeeName: any = employee?.find(item => item?.employeeId === scheduleAppoinmentList?.id)
    //setEmployee(employeeName)
    setEmployeeName(employeeName?.employeeName)
  },[employee, scheduleAppoinmentList?.id])

  return (
    <div className="urbanist-font my-6 rounded-2xl chackout-card-container">
      {" "}
      {/* Adjusted width to be responsive */}
      {/* <CardContent>
        <Box className="flex justify-between gap-2 my-2 py-2 serviceCardDetail" sx={{'@media (max-width: 500px)': {display: 'flex', justifyContent: 'center', flexDirection: 'column'}}}>

          <img
            className="establishmentImageCls"
            src={imageUrls[0]}
            style={{ width: "350px", height: "120px", margin: "10px" }}
          />
          <Text
            sx={styles.subHeading}
            name={establishmentName}
            style={{ }}
          />
        </Box>

        {
          scheduleAppoinmentList?.startTime && 
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            {(activeStep != 0 && scheduleAppoinmentList?.selectedDate && (typeof scheduleAppoinmentList?.selectedDate === 'string')) && <Box sx={{display: 'flex'}}><Box><GetIcon iconName="CalendarIcon"/></Box><Box sx={{paddingLeft: 1, color: '#4D4D4D', fontSize: '16px', fontWeight: 400}}>{convertDateToReadAbleDate(scheduleAppoinmentList?.selectedDate )}</Box></Box>}
            <Box sx={{display: 'flex'}}>
              <GetIcon iconName="AccessTimeFilledIcon"/>
              <Box sx={{paddingLeft: 1, color: '#4D4D4D', fontSize: '16px', fontWeight: 400}}>{`${scheduleAppoinmentList?.startTime}-${scheduleAppoinmentList?.endTime}`}</Box>
            </Box>
          </Box>
        }

        {
          (scheduleAppoinmentList?.startTime && employeeName) &&
          <Box sx={{display: 'flex', paddingTop: 2}}>
            <GetIcon iconName="PersonIcon"/>
            <Box sx={{paddingLeft: 1, color: '#4D4D4D', fontSize: '16px', fontWeight: 400}} >{employeeName}</Box>
          </Box>
        }

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
                name={`${item.duration} mins`}
                align="left"
              />
            </div>
          ))}
        </div>
        <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
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
              className="text-sm font-normal pb-2"
              style={{ color: "#808080" }}
            >
              excluding Tax
            </div>
            <div
              className="text-sm font-normal pb-2"
              style={{ color: "#808080" }}
            >
              {totalDuration} mins
            </div>

            <div className="flex justify-center pt-2">
              {activeStep < 2 ? (
                <Button
                  disabled={disabled}
                  className="w-full"
                  onClick={() => sendDataToParent()}
                  sx={styles.btn}
                  variant="contained"
                >
                  Proceed
                </Button>
              ) : (
                <AppointmentConfimed
                  establishmentId={establishmentId}
                  activeStep={activeStep}
                />
              )}
            </div>
          </div>
        }
      </CardContent> */}

      {/* sticky footer */}
      <Card className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl shadow-lg">
      <CardContent>
        <Box className="flex justify-between items-center">
          <Box>
            <Text
              name={`${totalServices} service${totalServices !== 1 ? 's' : ''} | ${totalDuration} mins`}
            />
            <Text
              name={`$${totalPrice.toFixed(2)}`}
            />
          </Box>
          <Button
            disabled={disabled}
            onClick={sendDataToParent}
            sx={styles.btn}
            variant="contained"
          >
            Proceed
          </Button>
        </Box>
      </CardContent>
    </Card>
    </div>
  );
}

export default CheckoutFooterCard;

const styles = {
  subHeading: {
    color: "#4D4D4D",
    fontSize: "20px",
    fontWeight: 600,
    paddingLeft: 0,
    paddingTop: 1,
    width: "210px" 
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
