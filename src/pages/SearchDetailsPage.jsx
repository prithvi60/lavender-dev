import React, { useState } from 'react'
import Navbar from '../components/NavBar'
import { Box } from '@mui/material';
import EstablishmentDetails from '../features/EstablishmentDetails/EstablishmentDetails';

function SearchDetailsPage() {
  const [isSearchPage, setIsSearchPage] = useState(true);
  return (
    <Box className='landing-page'>
        <Navbar isSearchPage={isSearchPage}/>
        <EstablishmentDetails />
    </Box>
  )
}

export default SearchDetailsPage