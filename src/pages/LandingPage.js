import React, { useEffect, useState } from 'react';
import HeroSection from '../features/Landing/HeroSection';
import CategorySection from '../features/Landing/CategorySection';
import RecommendSection from '../features/Landing/RecommendSection';
import Navbar from '../components/NavBar';
import { Box, Container } from '@mui/material';
import LearnMore from './LearnMore.tsx';
import { updateUser } from '../store/slices/currentUserSlice.js';
import endpoint from '../api/endpoints.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LandingFooter from './landingFooter.tsx';
import Benifits from './Benifits.tsx';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('Token')) {
        const fetchCurrentUserDetails = async () => {
          try {
            const response = await endpoint.getCurrentUserDetails();
            const userDetails = response?.data;
            dispatch(updateUser(userDetails?.data));
            setIsLoggedIn(true);
            if (userDetails?.success && userDetails?.data?.userType === 'BU') {
              navigate('/business');
            }
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
        fetchCurrentUserDetails();
      }
    }, 1000);
  }, []);

  const userDetails = useSelector((state) => state.currentUserDetails);

  return (
    <Box className="landing-page">
      <Navbar isSearchPage={false} isLoggedIn={isLoggedIn} userName={userDetails.fullName} />
      <HeroSection />
      <Container maxWidth="xl">
        <CategorySection />
        <RecommendSection />
        <LearnMore />
        <Benifits />
      </Container>
      <LandingFooter />
    </Box>
  );
};

export default LandingPage;
