import { Grid } from '@mui/material';
import React from 'react';
import GetImage from '../assets/GetImage';

function Benifits() {
  return (
    <div className='mt-4'>

      <Grid className='' container >

        <Grid className='benifit-card' item xs={12} md={4} lg={4}>
          <GetImage className='flex justify-center items-center' imageName='FaceService' />
          <p className='mb-2 font-bold urbanist-font text-3xl'>Personalized Service Selection</p>
          <p className='urbanist-font text-xl'>Choose from our array of soothing services, each designed to rejuvenate your mind, body, and soul.</p>
        </Grid>

        <Grid className='benifit-card' item xs={12} md={4} lg={4}>
          <GetImage className='' imageName='BookingImage' />
          <p className="urbanist-font mb-2 font-bold text-3xl">Effortless
            Booking</p>
          <p className="urbanist-font text-xl">We offer a user-friendly online platform for effortless appointment scheduling. </p>
        </Grid>

        <Grid className='benifit-card' item xs={12} md={4} lg={4}>
          <GetImage imageName='CancellationImage' />
          <p className="urbanist-font mb-2 font-bold text-3xl">Cancellation</p>
          <p className="urbanist-font text-xl">To cancel an appointment, please provide a minimum of 24 hours' notice. </p>
        </Grid>
      </Grid>
    </div>

  );
}

export default Benifits;
