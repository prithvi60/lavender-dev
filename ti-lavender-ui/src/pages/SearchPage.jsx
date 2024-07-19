import React, { useState } from 'react'
import SearchResult from '../features/SearchPanel/SearchResult.tsx'

import Navbar from '../components/NavBar'
import { Box } from '@mui/material';

function SearchPage() {
    const [isSearchPage, setIsSearchPage] = useState(true);
  return (
    <Box className='landing-page'>
        <Navbar isSearchPage={isSearchPage}/>
        <SearchResult />
    </Box>
  )
}

export default SearchPage