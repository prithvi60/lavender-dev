import React, { useState } from 'react'
import Navbar from '../components/NavBar'
import { Box } from '@mui/material';
import EstablishmentDetails from '../features/EstablishmentDetails/EstablishmentDetails';
import { useParams } from "react-router-dom";

function SearchDetailsPage() {
  const [isSearchPage, setIsSearchPage] = useState(true);
  const {estId} = useParams();
  console.log('estId : ', estId)
  return (
    <Box className='landing-page'>
        <Navbar isSearchPage={isSearchPage}/>
        <EstablishmentDetails estId={estId}/>
    </Box>
  )
}

export default SearchDetailsPage