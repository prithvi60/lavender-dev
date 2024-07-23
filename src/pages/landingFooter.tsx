import React from 'react';
import GetIcon from '../assets/Icon/icon';
import Text from "../components/Text";
import Button from '../components/Button';
import { Divider, Grid } from '@mui/material';

function LandingFooter() {
  return (
    <div className='mt-4 border landingFooter'>
      <div className='footer-header'>
        <div className='flex gap-1 w-full'>
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
        <Button className='urbanist-font cursor-pointer footer-dwnld-btn' variant='contained' name={'Download the App'}></Button>
      </div>

      <Divider style={{backgroundColor:'#A7A7A766'}}/>

      <div className='footer-body'>
        <div className='footer-details'>
          <div className='text-white urbanist-font text-lg'> Lavender helps salons and end users...etc. -sentence TBD</div>
          <p>twitter</p>
        </div>
        <div className='footer-links'>
          <div className='urbanist-font link-title text-lg'>Discover and Book</div>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
        </div>
        <div className='footer-links'>
          <div className='urbanist-font link-title text-lg'>Discover and Book</div>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
          <p className='text-white'>twitter</p>
        </div>
      </div>

      <Divider style={{backgroundColor:'#A7A7A766'}}/>

      <div className="footer-foot">
        <div className='urbanist-font cursor-pointer text-lg text-white'>About</div>
        <div className='urbanist-font cursor-pointer text-lg text-white'>Contact Us</div>
      </div>


    </div>
  );
}

export default LandingFooter;
