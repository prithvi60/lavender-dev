import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Skeleton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Text from "../../components/Text";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints";
import { UpdateCheckoutInfo } from "../../store/slices/Booking/ScheduleAppoinmentSlice";
import GetIcon from "../../assets/Icon/icon";
import { convertDateToReadAbleDate } from "../../utils/TimeFormat";

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CheckoutFooterCard(props) {
  const { activeStep, next, establishmentName, establishmentId } = props;

  const dispatch = useDispatch();
  const checkOutList = useSelector((state: any) => state.checkOutPage);

  const scheduleAppoinmentList = useSelector(
    (state: any) => state.ScheduleAppoinment
  );

  const [imageIdList, setImageIdList] = useState<string | any>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

  const [disabled, setDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [totalServices, setTotalServices] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
    next((prevActiveStep) => prevActiveStep + 1);
    handleCloseModal()
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

  useEffect(() => {
    const employeeName: any = employee?.find(item => item?.employeeId === scheduleAppoinmentList?.id)
    setEmployeeName(employeeName?.employeeName)
  }, [employee, scheduleAppoinmentList?.id])

  return (
    <div className="urbanist-font my-6 rounded-2xl chackout-card-container">
      <Card 
        className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl shadow-lg"
        onClick={handleOpenModal}
        sx={{ cursor: 'pointer' }}
      >
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
              onClick={(e) => {
                e.stopPropagation();
                sendDataToParent();
              }}
              sx={styles.btn}
              variant="contained"
            >
              Proceed
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullScreen={isMobile}
        TransitionComponent={Transition}
        PaperProps={{
          style: isMobile
            ? {
                margin: 0,
                height: "70%",
                maxHeight: "70%",
                position: "absolute",
                bottom: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }
            : {},
        }}
      >
        <DialogTitle sx={{mb:2}}>
         
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: 2,
          }}
        >
          <Box sx={{ width: '100%', height: 200, mb: 2 }}>
            {loading ? (
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={200} 
                animation="wave"
                sx={{ borderRadius: '8px' }}
              />
            ) : (
              <img
                className=""
                src={imageUrls[0]}
                style={{ 
                  width: "100vw", 
                  height: "200px", 
                  objectFit: "cover", 
                  borderRadius: "8px" 
                }}
                alt={establishmentName}
              />
            )}
          </Box>
          <Text
            sx={styles.subHeading}
            name={establishmentName}
          />
          
          {scheduleAppoinmentList?.startTime && (
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
              {(activeStep != 0 && scheduleAppoinmentList?.selectedDate && (typeof scheduleAppoinmentList?.selectedDate === 'string')) && <Box sx={{display: 'flex'}}><Box><GetIcon iconName="CalendarIcon"/></Box><Box sx={{paddingLeft: 1, color: '#4D4D4D', fontSize: '16px', fontWeight: 400}}>{convertDateToReadAbleDate(scheduleAppoinmentList?.selectedDate )}</Box></Box>}
              <Box sx={{display: 'flex'}}>
                <GetIcon iconName="AccessTimeFilledIcon"/>
                <Box sx={{paddingLeft: 1, color: '#4D4D4D', fontSize: '16px', fontWeight: 400}}>{`${scheduleAppoinmentList?.startTime}-${scheduleAppoinmentList?.endTime}`}</Box>
              </Box>
            </Box>
          )}

          {(scheduleAppoinmentList?.startTime && employeeName) && (
            <Box sx={{display: 'flex', mt: 2}}>
              <GetIcon iconName="PersonIcon"/>
              <Box sx={{paddingLeft: 1, color: '#4D4D4D', fontSize: '16px', fontWeight: 400}} >{employeeName}</Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {checkOutList.checkOut.map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Text
                    sx={styles.serviceName}
                    name={item?.serviceName}
                  />
                  <Text
                    sx={styles.startingPrice}
                    name={`$${item.finalPrice}`}
                  />
                </Box>
                <Text
                  sx={styles.duration}
                  name={`${item.duration} mins`}
                />
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              excluding Tax
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalDuration} mins
            </Typography>
          </Box>
        </DialogContent>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            padding: 2,
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Button
            variant="contained"
            onClick={sendDataToParent}
            disabled={disabled}
            fullWidth
            sx={{
              backgroundColor: "#8B5CF6",
              "&:hover": {
                backgroundColor: "#7C3AED",
              },
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Proceed
          </Button>
        </Box>
      </Dialog>
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