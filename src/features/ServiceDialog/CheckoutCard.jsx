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


const checkoutData = [{'name': 'Yong Chow’s Paradise - Women’s Parlour & Spa', 'services': [{'serviceName': 'haircut', 'duration': '30mins', 'finalPrice': 50},{'serviceName': 'Layered Long Haircut', 'duration': '60mins', 'finalPrice': 60}, {'serviceName': 'Layered Long Haircut', 'duration': '60mins', 'finalPrice': 60}, {'serviceName': 'Layered Long Haircut', 'duration': '60mins', 'finalPrice': 60}]}]

function CheckoutCard(props) {
  const {next, establishmentName} = props
  const checkOutList = useSelector(
    (state) => state.checkOutPage
  );

  const [disabled, setDisabled] = useState(true);

  useEffect(()=>{
    if(checkOutList.checkOut.length > 0){
      setDisabled(false);
    }
  },[checkOutList])
  

  let totalPrice = 0;
  function calculateTotalPrice(){
    for(let item of checkOutList.checkOut){
      totalPrice = totalPrice + item.finalPrice
    }
    return totalPrice;
  }

  const btnStyle = {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    mstransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)"
  }

  const sendDataToParent = () => {
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
                  <div className='text-lg font-bold'>${calculateTotalPrice()}</div>
                </div>
                <div className='text-sm font-normal pb-2'>excluding Tax</div>

                <div className='flex justify-center'>
                  <Button  disabled={disabled} className='w-full' onClick={sendDataToParent} sx={{ display: 'flex', justifyContent: 'center'}} variant="contained" >Proceed</Button>
                </div>
            </div>
          }
        </CardContent>
        
      </div>

  )
}

export default CheckoutCard