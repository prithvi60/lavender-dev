import React, { useEffect, useState } from 'react'
//import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import SideBar from '../components/SideBar.tsx';
import AppointmentsPage from '../features/Business/Appointments/AppointmentsTable.tsx';
import { DrawerProvider } from '../features/Business/BusinessDrawerContext.tsx';
import BusinessHeader from '../features/Business/BusinessHeader.tsx';
import { BusinessClients } from '../features/Business/Clients/BusinessClients.tsx';
import {Services} from '../features/Business/services/Services.tsx'
import BusinessTeam from '../features/Business/team/BusinessTeam.tsx';
import SchedulePageWrapper from '../features/Business/Schedule/SchedulePage.tsx';
import endpoint from '../api/endpoints.ts';
import { getBrowserCache } from '../api/constants.ts'
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setEstablishmentData } from '../store/slices/businessSlice.js';
import { SalonProfile } from '../features/Business/SalonProfile/SalonProfile.tsx';
import { updateUser } from '../store/slices/currentUserSlice.js';

const BusinessLayoutPage = () => {
  
  //const [isSearchPage, setIsSearchPage] = useState(true);
  const [activeField, setActiveField] = useState("Schedule")
  const [userDetails, setUserDetails] = useState('')
  const dispatch = useDispatch()
  const getData = useSelector(
    (state) => state.businessSlice
  );

  useEffect(()=>{
    setTimeout(()=>{
      if(localStorage.getItem('Token')){
        const fetchCurrentUserDetails = async () => {
            try {
              const response = await endpoint.getCurrentUserDetails(); // Call the async function to get user details
              const userDetails = response?.data; // Assuming response.data contains the user details
              setUserDetails(userDetails)

              dispatch(updateUser(userDetails?.data)); // Dispatch the updateUser action with user details
            } catch (error) {
              console.error('Error fetching user details:', error); // Handle any errors that occur
            }
          }
          fetchCurrentUserDetails();
      }
    },[1000])
    
  },[])
  
  useEffect(()=> {
    const getEstablishmentDetails = async () => {
      const response = await endpoint.getEstablishmentDetailsById(userDetails?.data?.establishmentId)//getBrowserCache('EstablishmentId')
      if(response.status === 200) {
        dispatch(setEstablishmentData(response.data.data))
      }else {
        console.log("err-getEstablishmentDetailsById",response)
      }
    }

    getEstablishmentDetails()
  }, [userDetails])

  const renderMainContent = () => {
    switch (activeField) {
      case 'Home':
        return <div>Home</div>;
      case 'Schedule':
        return <SchedulePageWrapper />;
      case 'Appointments':
        return <AppointmentsPage estId={userDetails?.data?.establishmentId}/>
      case 'Clients':
        return <BusinessClients/>
      case 'Services':
        return <Services />
      case 'Team':
        return <BusinessTeam/>
      case 'Salon profile':
        return <SalonProfile/>
      default:
        return <div>Default</div>;
    }
  }
  //TODO: try Route,Switch to handle rendering main content
  return (
    <DrawerProvider>
      <Box className='landing-page'>
      <div className='flex flex-col h-full'>
        <BusinessHeader pageName={activeField}/>
        <div className='flex flex-row'>
          <div className='rounded-lg h-max'>
            <SideBar activeField={activeField} onChange={setActiveField}/>
          </div>
          <div id='render-main' className='w-full h-full' style={{overflowX:'hidden'}}>
            {renderMainContent()}
          </div>
        </div> 
      </div>
      </Box>

    </DrawerProvider>
    
  );
};



export default BusinessLayoutPage;