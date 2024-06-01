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

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const tokenValue = getBrowserCache('Token');

    useEffect(()=>{
        if(tokenValue){
            setIsLoggedIn(true);
        }
    },[tokenValue])

    return (
        <Box className='landing-page'>
            <Navbar isSearchPage={false} isLoggedIn={isLoggedIn} />
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