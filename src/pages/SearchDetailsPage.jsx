import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import { Box } from '@mui/material';
import EstablishmentDetails from '../features/EstablishmentDetails/EstablishmentDetails';
import { useParams } from "react-router-dom";
import { getBrowserCache } from '../api/constants';

function SearchDetailsPage() {
  const [isSearchPage, setIsSearchPage] = useState(true);
  const {estId} = useParams();
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  
  const userDetails = getBrowserCache("UserId")

  useEffect(()=>{
    if(userDetails){
      setIsLoggedIn(true)
    }
  },[userDetails])
  return (
    <Box className='landing-page'>
        <Navbar isSearchPage={isSearchPage} userName={'vamsi'} isLoggedIn={isLoggedIn}/>
        <EstablishmentDetails estId={estId}/>
    </Box>
  )
}

export default SearchDetailsPage