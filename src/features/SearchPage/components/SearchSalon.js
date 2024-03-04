import React from 'react';
import { Box } from '@mui/material';
import { SearchBar, SearchButton } from '../../../components/componentHelpers';

const SearchSalon = ({ label }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your search logic here
  };

  const handleClear = () => {}

  return (
    <Box component="form" onSubmit={handleSubmit} >
        <SearchBar placeholder={"Search by salon name"} icon={"search"} handleClear={handleClear}/>
        <div className='searchBar'>
            <SearchButton />
        </div>
        
    </Box>
  );
};

export default SearchSalon;