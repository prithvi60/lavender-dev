import React, { useState, useEffect } from 'react'
import SearchResult from '../features/SearchPanel/SearchResult.tsx'
import { getBrowserCache } from '../api/constants.ts';
import Navbar from '../components/NavBar'
import { Box } from '@mui/material';

function SearchPage() {
    const [isSearchPage, setIsSearchPage] = useState(true);
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    const userDetails = getBrowserCache("UserId")
  useEffect(()=>{
    if(userDetails){
      setIsLoggedIn(true)
    }
  },[userDetails])
  return (
    <Box className='landing-page'>
        <Navbar isSearchPage={isSearchPage} isLoggedIn={isLoggedIn}/>
        <SearchResult />
    </Box>
  )
}

export default SearchPage