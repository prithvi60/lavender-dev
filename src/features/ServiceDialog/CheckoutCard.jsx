import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, Rating, CardActions, Collapse, Button, CardHeader } from '@mui/material';
import GetImage from '../../assets/GetImage';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import emptyLogo from "../../assets/emptyImage.png"
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Divider } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints';
import AppointmentConfimed from './AppointmentConfimed';
import { UpdateCheckoutInfo } from '../../store/slices/Booking/ScheduleAppoinmentSlice';

function CheckoutCard(props) {
  const {activeStep, next, establishmentName, establishmentId} = props

  const dispatch = useDispatch();
  const checkOutList = useSelector(
    (state) => state.checkOutPage
  );

  const [disabled, setDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);


  useEffect(()=>{
    if(checkOutList.checkOut.length > 0){
      setDisabled(false);
      calculateTotalPrice();
      calculateTotalDuration();
    }
  },[checkOutList])


  function calculateTotalPrice(){
    for(let item of checkOutList.checkOut){
      setTotalPrice(totalPrice + item?.finalPrice)
    }
  }

  function calculateTotalDuration(){
    for(let item of checkOutList.checkOut){
     setTotalDuration(totalDuration + item?.duration)
    }
  }

  dispatch(UpdateCheckoutInfo({
    totalPrice:  totalPrice,
    totalDuration: totalDuration
  }))

  const btnStyle = {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    mstransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)"
  }

  function sendDataToParent() {
    
    next((prevActiveStep) => prevActiveStep + 1); // Invoke the callback function with data
  };

  return (
      <div className='urbanist-font mb-6 rounded-2xl chackout-card-container'> {/* Adjusted width to be responsive */}
        <CardContent >
          <div className='flex justify-between gap-2 my-2 py-2 serviceCardDetail'>
            {/* <img src={} className='w-full md:w-60 h-24 mb-4 md:mb-0 rounded-2xl' alt='Logo'/> */}
            <GetImage className='w-2/4' imageName='SaloonImage'/>
            <div className='text-xl w-2/4 font-bold px-2'>{establishmentName}</div>
          </div>

          <div className='py-2 overflow-auto checkout-card'>
            {checkOutList.checkOut.map((item, index) => (
              <div className='py-2'>
                <div className='flex justify-between py-1' key={index}>
                  <div className='text-lg font-bold'>{item.serviceName}</div>
                  <div className='text-lg font-bold'>${item.finalPrice}</div>
                </div>
                <div className='text-sm font-normal'>{item.duration} mins</div>
              </div>
            ))}
          </div>
          <Divider />
          {
            // checkOutList.checkOut.length > 0 && 
              <div className='pt-3'>
                <div className='flex justify-between'>
                  <div className='text-lg font-bold'>Total</div>
                  <div className='text-lg font-bold'>${totalPrice}</div>
                </div>

                <div className='text-sm font-normal pb-2'>excluding Tax</div>
                <div className='text-sm font-normal pb-2'>{totalDuration} mins</div>


                <div className='flex justify-center'>
                  {activeStep < 2 ? <Button  disabled={disabled} className='w-full' onClick={()=>sendDataToParent()} sx={{ display: 'flex', justifyContent: 'center'}} variant="contained" >Proceed</Button> : <AppointmentConfimed establishmentId={establishmentId} activeStep={activeStep}/>}
                </div>
            </div>
          }
        </CardContent>
      </div>

  )
}

export default CheckoutCard