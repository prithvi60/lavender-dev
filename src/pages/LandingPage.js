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
import { jwtDecode } from 'jwt-decode';

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const tokenValue = getBrowserCache('Token');

    if(tokenValue){
        
    }

    useEffect(()=>{
        if(tokenValue){
            const tokenVal = jwtDecode(tokenValue)
            console.log('tokenVal : ', tokenVal)
            const tempUserName = tokenVal.sub.substring(0, 5);
            setUserName(tempUserName);
            const expiryTimeInSeconds = tokenVal.exp;
            const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
            const tokenValid = currentTimestamp < expiryTimeInSeconds;
            if(tokenValid){
                setIsLoggedIn(true);
            }
        }
    },[tokenValue])

    return (
        <Box className='landing-page'>
            <Navbar isSearchPage={false} isLoggedIn={isLoggedIn} userName={userName}/>
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