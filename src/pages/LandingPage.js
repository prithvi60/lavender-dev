import React from 'react';
import HeroSection from '../features/Landing/HeroSection';
import CategorySection from '../features/Landing/CategorySection';
import RecommendSection from '../features/Landing/RecommendSection';
import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import SearchResult from '../features/SearchPanel/SearchResult';

const LandingPage = () => {
    return (
        <Box className='landing-page'>
            <Navbar />
            <HeroSection />
            <SearchResult />
            <CategorySection />
            <RecommendSection />
        </Box>
        
     );
}

export default LandingPage;