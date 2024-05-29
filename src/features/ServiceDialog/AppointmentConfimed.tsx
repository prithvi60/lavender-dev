import { Modal, Divider, Slider, Avatar } from '@mui/material';
import Buttons from "@mui/material/Button";
import { Box, Grid } from '@mui/material';
import React from 'react'
import { Controller } from 'react-hook-form';
import Button from "../../components/Button";
import endpoint from '../../api/endpoints';
import GetIcon from '../../assets/Icon/icon';
import { useNavigate } from 'react-router-dom';
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

const AppointmentConfimed = ({activeStep}) => {
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen((prev) => !prev);
    navigate("/");
  };

  function saveAppointmentClick(){

    
    if(activeStep===2){
        console.log("in methoddd activeStep ...")
        const payLoad = {
          "customerId": "2500",
          "establishmentId": "2500",
          "employeeId": "201",
          "startTime": "2024-05-29T10:00:00+08:00",
          "endTime": "2024-05-29T11:30:00+08:00",
          "totalDuration": 90,
          "totalCost": 75,
          "appointmentNotes": "Prefer organic products",
          "serviceTags": [
            "Hair","Facial"
          ],
          "appointmentServices": [
            {
              "serviceId": "101",
              "optionId": "1011"
            },
            {
              "serviceId": "102",
              "optionId": "1021"
            }
          ],
          "payAtVenue": false,
          "cardStoreId": "2500"
        }
        const appointmentBooking = endpoint.saveAppointmentBookings(payLoad);
        console.log('appointmentBooking : ', appointmentBooking);
        
    }
    setOpen((prev) => !prev);

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