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
    (state) => state.checkOutPage
  );
  const { selectedDate,timeOfDay,startTime,endTime ,id} = useSelector(
    (state) => state.ScheduleAppoinment
  );
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  async function saveAppointmentClick(){

    
    if(activeStep===2){
        const payLoad:SaveAppoinment = {
          "customerId": "2500",
          "establishmentId": establishmentId,
          "employeeId": "E101",
          "startTime": convertToDateTime(startTime,selectedDate),
          "endTime": convertToDateTime(endTime,selectedDate),
          "totalDuration": checkOutList.checkOut[0].duration,
          "totalCost": checkOutList.checkOut[0].finalPrice,
          "appointmentNotes": "Prefer organic products",
          "serviceTags": [
            "Hair","Facial"
          ],
          "appointmentServices": [
            {
              "serviceId": checkOutList.checkOut[0].serviceId,
              "optionId": checkOutList.checkOut[0].optionId
            },
          ],
          "paymentInfo": {
            "payAtVenue": false,
            "cardStoreId": "2500"
          },
          "walkIn": false
        }
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
                        console.log("filter icon clicked")
                        }}
                        className='my-5 mx-16 p-1 cursor-pointer rounded-sm' 
                        iconName="CalendarConfirmedIcon"/>
                    <div id="title" className="font-bold text-xl mb-3">Dear John</div>
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