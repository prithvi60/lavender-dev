import React from 'react';
import GetIcon from '../assets/Icon/icon';
import Text from "../components/Text";
import Button from '@mui/material/Button/Button';
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
        <Button className='urbanist-font cursor-pointer' variant='contained'>Download the App</Button>
      </div>

      <Divider style={{backgroundColor:'#A7A7A7'}}/>

      <div>
        <Grid container spacing={3}>
          <Grid item  sm={12} md={4} lg={4}><div className='text-white urbanist-font text-3xl'> Lavender helps salons and end users...etc. -sentence TBD</div></Grid>
          <Grid item sm={12} md={4} lg={4} ><Button className='urbanist-font text-xl'> Discover and Book</Button></Grid>
          <Grid item sm={12} md={4} lg={4}><Button className='urbanist-font text-xl'> For Salons</Button></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LandingFooter;
