import React, { useState } from 'react'
import Index from '../features/CustomerProfile/Index'
import { Box } from '@mui/material';
import Navbar from '../components/NavBar';

export const UserPage = () => {
    const [isSearchPage, setIsSearchPage] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
        <Box className='landing-page'>
            <Navbar isSearchPage={isSearchPage} isLoggedIn={isLoggedIn} userName={'johnt'}/>
            <Index />
        </Box>
    </div>
  )
}
