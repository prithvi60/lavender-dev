import React, { useState } from 'react';
import HeroSection from '../features/Landing/HeroSection';
import CategorySection from '../features/Landing/CategorySection';
import RecommendSection from '../features/Landing/RecommendSection';
import Navbar from '../components/NavBar';
import { Box } from '@mui/material';
import LearnMore from './LearnMore.tsx'
import SearchResult from '../features/SearchPanel/SearchResult.tsx';

const LandingPage = () => {
    const [isSearchPage, setIsSearchPage] = useState(false);
    return (
        <Box className='landing-page'>
            <Navbar isSearchPage={isSearchPage}/>
            <HeroSection />
            {/* <SearchResult /> */}
            <CategorySection />
            <RecommendSection />
            <LearnMore/>
        </Box>
        
     );
}

export default LandingPage;