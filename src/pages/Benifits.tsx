import { Grid } from '@mui/material';
import React from 'react';
import GetImage from '../assets/GetImage';

function Benifits() {
  return (
    <div className='mt-4'>

      <div className='home-benifits-cards p-4'>

        <div className='rounded-xl shadow-lg p-6 border'>
          <GetImage className='flex justify-center items-center' imageName='FaceService' />
          <p className='my-5 font-bold urbanist-font text-2xl lg:text-3xl'>Personalized Service Selection</p>
          <p className='urbanist-font text-lg md:text-xl'>Choose from our array of soothing services, each designed to rejuvenate your mind, body, and soul.</p>
        </div>

        <div className='rounded-xl shadow-lg p-6 border'>
          <GetImage className='flex justify-center items-center' imageName='BookingImage' />
          <p className="urbanist-font my-5 font-bold text-2xl lg:text-3xl">Effortless
            Booking</p>
          <p className="urbanist-font text-lg md:text-xl">We offer a user-friendly online platform for effortless appointment scheduling. </p>
        </div>

        <div className='rounded-xl shadow-lg p-6 border'>
          <GetImage className='flex justify-center items-center' imageName='CancellationImage' />
          <p className="urbanist-font my-5 font-bold text-2xl lg:text-3xl">Cancellation</p>
          <p className="urbanist-font text-lg md:text-xl">To cancel an appointment, please provide a minimum of 24 hours' notice. </p>
        </div>
      </div>
    </div>

  );
}

export default Benifits;
