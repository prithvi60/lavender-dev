import { Modal, Divider, Slider, Avatar } from '@mui/material';
import Buttons from "@mui/material/Button";
import { Box, Grid } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import Button from "../../components/Button";
import endpoint from '../../api/endpoints';
import GetIcon from '../../assets/Icon/icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SaveAppoinment } from '../../interface/interface';
import { convertToDateTime, convertToISO8601 } from '../../utils/TimeFormat';
import { resetFilter } from '../../store/slices/Booking/ScheduleAppoinmentSlice';
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

const AppointmentConfimed = ({establishmentId, activeStep}) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const navigate = useNavigate();
  const checkOutList = useSelector(
    (state: any) => state.checkOutPage
  );
  
  const { selectedDate, timeOfDay, startTime, endTime ,id} = useSelector(
    (state: any) => state.ScheduleAppoinment
  );
  



  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  const userDetails = useSelector((state: any) => {
    return state.currentUserDetails;
  });

  async function saveAppointmentClick(){

    
    if(activeStep===2){

        const modifiedStartTime = convertToDateTime(startTime, selectedDate);
        const modifiedEndTime = convertToDateTime(endTime, selectedDate)

        const payLoad = {
          "establishmentId": 'EST00002507',
          "id": "",
          "createdDate": new Date(),
          "createdBy": "",
          "lastModifiedDate": new Date(),
          "lastModifiedBy": "",
          "customerId": userDetails?.userId,
          "bookedBy": "",
          "bookingTime": new Date(),
          "totalDuration": checkOutList.checkOut[0].duration,
          "totalCost": checkOutList.checkOut[0].finalPrice,
          "appointmentServices": [],
          "paymentInfo": {
            "payAtVenue": true,
            "cardStoreId": "string",
            "paymentStatus": "string",
            "paymentTxnId": "string"
          }
        }

        const appointmentServices = checkOutList.checkOut.map(item => ({
          serviceId: item.serviceId,
          optionId: item.optionId,
          serviceNotes: 'confirmed', 
          employeeId: 'EMP00002500', 
          serviceCost: item.finalPrice, 
          bookingStatus: 'string', 
          startTime: modifiedStartTime, 
          endTime: modifiedEndTime, 
          review: {
            serviceRating: 0,
            reviewDate: '',
            publicComments: '', 
            privateComments: '' 
          }
        }));
        
        // Assign the dynamically populated appointmentServices to payload
        payLoad.appointmentServices = appointmentServices;
        
        
        const appointmentBooking =await endpoint.saveAppointmentBookings(payLoad);
        
        setOpen((prev) => !prev);

        if(appointmentBooking.status === 200){
          dispatch(resetFilter())
        }
      }

  }

  return (
    <div>
    <Buttons  disabled={false} className='w-full' onClick={()=>saveAppointmentClick()} sx={{ display: 'flex', justifyContent: 'center'}} variant="contained" >Proceed</Buttons>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-3xl filter-box">
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <GetIcon onClick={    
                        () => {
                        }}
                        className='my-5 mx-16 p-1 cursor-pointer rounded-sm' 
                        iconName="CalendarConfirmedIcon"/>
                    <div id="title" className="font-bold text-xl mb-3">Dear {userDetails?.fullName}</div>
                    <div>Your appointment has been confirmed</div>
                </div>
                <Grid container spacing={2} className='filters-container'>
                <Grid item xs={12}>
                    
                </Grid>
                </Grid>
            </Box>
      </Modal>
    </div>
  )
}

export default AppointmentConfimed