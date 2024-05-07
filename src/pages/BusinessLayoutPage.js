import React, { useState } from 'react'
//import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
//import CalenderTimeline from '../features/Business/Schedule/CalenderTimeline';

const BusinessLayoutPage = () => {
  //const [isSearchPage, setIsSearchPage] = useState(true);
  const [activeField, setActiveField] = useState("Home")

  const renderMainContent = () => {
    console.log("test", activeField, Date.now())
    switch (activeField) {
      case 'Home':
        return <div>Home</div>;
      case 'Schedule':
        return <div>Schedule</div>;
      default:
        return <div>Default</div>;
    }
  }
  //TODO: try Route,Switch to handle rendering main content
  return (
    <Box className='landing-page'>
      <div className='flex flex-col h-screen'>
        {/* <div className='drop-shadow-md'>
          <Navbar isSearchPage={isSearchPage}/>
        </div> */}
        <div className='flex flex-row'>
          <div className='shadow-2xl rounded-lg h-max'>
            <SideBar activeField onChange={setActiveField}/>
          </div>
          <div className='w-full h-screen'>
            {renderMainContent()}
          </div>
        </div>
        
        
      </div>
    </Box>
  );
};



export default BusinessLayoutPage;