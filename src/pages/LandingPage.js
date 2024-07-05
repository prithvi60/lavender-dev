import React, { useEffect, useState } from 'react';
import HeroSection from '../features/Landing/HeroSection';
import CategorySection from '../features/Landing/CategorySection';
import RecommendSection from '../features/Landing/RecommendSection';
import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import LearnMore from './LearnMore.tsx'
import Benifits from './Benifits.tsx';
import LandingFooter from './landingFooter';
import { getBrowserCache } from '../api/constants.ts';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/currentUserSlice.js';
import endpoint from '../api/endpoints.ts';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
      setTimeout(()=>{
        if(localStorage.getItem('Token')){
          const fetchCurrentUserDetails = async () => {
              try {
                const response = await endpoint.getCurrentUserDetails(); // Call the async function to get user details
                const userDetails = response?.data; // Assuming response.data contains the user details
                dispatch(updateUser(userDetails?.data)); // Dispatch the updateUser action with user details
                setIsLoggedIn(true);
                if(userDetails?.success && userDetails?.data?.userType === 'BU'){
                  // navigate('/business');
                }
                console.log("suerDetails : ", userDetails)
              } catch (error) {
                console.error('Error fetching user details:', error); // Handle any errors that occur
              }
            }
            fetchCurrentUserDetails();
        }
      },[1000])
      
    },[])
    
    const userDetails = useSelector((state) => {
      return state.currentUserDetails;
    });

    return (
        <Box className='landing-page'>
            <Navbar isSearchPage={false} isLoggedIn={isLoggedIn} userName={userDetails.fullName}/>
            <HeroSection />
            {/* <SearchResult /> */}
            <div className='mx-4 max-w-7xl mx-auto'>

            <CategorySection />
            <RecommendSection />
            <LearnMore/>
            <Benifits/>
            </div>
            <LandingFooter/>

        </Box>
        
     );
}

export default LandingPage;