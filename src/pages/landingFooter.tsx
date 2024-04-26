import React from 'react';
import GetIcon from '../assets/Icon/icon';
import Text from "../components/Text";
import Button from '../components/Button';
import { Divider, Grid } from '@mui/material';

function LandingFooter() {
  return (
    <div className='mt-4 border h-96 landingFooter'>
      <div className='flex flex-col sm:flex-row justify-around my-6'>
        <div className='flex gap-1'>
          <GetIcon
            className="cursor-pointer"
            // onClick={gotoLandingPage}
            iconName="LavenderLogo"
          />
          <div
            // onClick={gotoLandingPage}
            className="cursor-pointer urbanist-font text-white text-2xl font-bold"
          >
            Lavender
          </div>
        </div>
        <div className='urbanist-font cursor-pointer text-lg text-white'>About</div>
        <div className='urbanist-font cursor-pointer text-lg text-white'>Contact Us</div>
        <Button className='urbanist-font cursor-pointer' variant='contained' name={'Download the App'}></Button>
      </div>

      <Divider style={{backgroundColor:'#A7A7A7'}}/>

      <div style={{padding: '30px'}}>
        <Grid container spacing={3}>
          <Grid item  sm={12} md={4} lg={4} ><div className='text-white urbanist-font text-lg'> Lavender helps salons and end users...etc. -sentence TBD</div></Grid>
          <Grid item sm={12} md={4} lg={4} ><Text className='urbanist-font text-xl' name={'Discover and Book'}> </Text></Grid>
          <Grid item sm={12} md={4} lg={4}><Text className='urbanist-font text-xl' name={'For Salons'}> </Text></Grid>
        </Grid>
      </div>


    </div>
  );
}

export default LandingFooter;
