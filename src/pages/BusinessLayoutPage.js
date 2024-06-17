import React, { useEffect, useState } from 'react'
//import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import AppointmentsPage from '../features/Business/Appointments/AppointmentsTable';
import { DrawerProvider } from '../features/Business/BusinessDrawerContext';
import BusinessHeader from '../features/Business/BusinessHeader';
import { BusinessClients } from '../features/Business/Clients/BusinessClients';
import {Services} from '../features/Business/services/Services'
import BusinessTeam from '../features/Business/team/BusinessTeam';
import SchedulePage from '../features/Business/Schedule/SchedulePage';
import endpoint from '../api/endpoints.ts';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setEstablishmentData } from '../store/slices/businessSlice.js';
import { SalonProfile } from '../features/Business/SalonProfile/SalonProfile.tsx';
import { updateUser } from '../store/slices/currentUserSlice.js';

const BusinessLayoutPage = () => {
  //const [isSearchPage, setIsSearchPage] = useState(true);
  const [activeField, setActiveField] = useState("Schedule")
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
            

              dispatch(updateUser(userDetails?.data)); // Dispatch the updateUser action with user details
            } catch (error) {
              console.error('Error fetching user details:', error); // Handle any errors that occur
            }
          }
          fetchCurrentUserDetails();
      }
    },[1000])
    
  },[])
  
  const { data: establishmentData, isLoading: isLoading, error: userDataError, refetch: refetchUserData } = 
  useQuery({queryKey: ['query-establishment'], queryFn: () =>{ return endpoint.getEstablishmentDetailsById('2502')}})
  if(!isLoading) {
    console.log("establishmentDatahere : : : ", establishmentData)
    dispatch(setEstablishmentData(establishmentData))
  }

  const renderMainContent = () => {
    console.log("test", activeField, Date.now())
    switch (activeField) {
      case 'Home':
        return <div>Home</div>;
      case 'Schedule':
        return <SchedulePage />;
      case 'Appointments':
        return <AppointmentsPage/>
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
      <div className='flex flex-col h-screen select-none'>
        {/* <div className='drop-shadow-md'>
          <Navbar isSearchPage={isSearchPage}/>
        </div> */}
        <BusinessHeader pageName={activeField}/>
        <div className='flex flex-row'>
          <div className='shadow-2xl rounded-lg h-max'>
            <SideBar activeField={activeField} onChange={setActiveField}/>
          </div>
          <div id='render-main' className='w-full h-screen' style={{overflowX:'hidden'}}>
            {renderMainContent()}
          </div>
        </div> 
      </div>
      </Box>

    </DrawerProvider>
    
  );
};



export default BusinessLayoutPage;