import React from 'react';
import GetIcon from '../assets/Icon/icon';
import Text from "../components/Text";
import Button from '../components/Button';
import { Box, Divider, Grid } from '@mui/material';

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
        <Box sx={styles.subHeader}>About</Box>
        <Box sx={styles.subHeader}>Contact Us</Box>
        <Button sx={styles.buttonStyles} variant='contained' name={'Download the App'}></Button>
      </div>

      <Divider style={{backgroundColor:'#A7A7A766'}}/>

      <div className='footer-body'>
        <div className='footer-details'>
          <div className='text-white urbanist-font text-lg'> Lavender helps salons and end users...etc. -sentence TBD</div>

          <Box>
            
          </Box>
        </div>
        <div className='footer-links'>
          <div className='urbanist-font link-title text-lg'>Discover and Book</div>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
        </div>
        <div className='footer-links'>
          <div className='urbanist-font link-title text-lg'>Discover and Book</div>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
          <p className='text-white'>Link 1</p>
        </div>
      </div>

      <Divider style={{backgroundColor:'#A7A7A766'}}/>

      <div className="footer-foot">
        <Box sx={styles.subHeader}>Privacy Policy</Box>
        <Box sx={styles.subHeader}>Terms of Service</Box>
      </div>


    </div>
  );
}

export default LandingFooter;

const styles = {
  buttonStyles : {
    width: '200px', 
    height: '37px', 
    fontFamily: 'Urbanist',
    borderRadius: '10px',
    padding: "10px, 40px, 10px, 40px !important",
    gap: '10px'
  },
  subHeader: {
    fontSize: '20px',
    fontWeight: 400,
    color: '#F2F2F2'
  }
}
