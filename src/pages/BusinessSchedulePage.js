import React, { useState } from 'react'
import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import CalenderTimeline from '../features/Business/Schedule/CalenderTimeline';

const BusinessSchedulePage = () => {
  const [isSearchPage, setIsSearchPage] = useState(true);

  return (
    <Box className='landing-page'>
      <div className='flex flex-col h-screen'>
        {/* <div className='drop-shadow-md'>
          <Navbar isSearchPage={isSearchPage}/>
        </div> */}
        <div className='flex flex-row'>
          <div className='shadow-2xl rounded-lg h-max'>
            <SideBar/>
          </div>
          <div className='w-full h-screen'>
            <CalenderTimeline/>
          </div>
        </div>
        
        
      </div>
    </Box>
  );
};



export default BusinessSchedulePage;