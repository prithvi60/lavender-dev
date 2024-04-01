import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from '@mui/icons-material';
import Text from './Text';
import ButtonRouter from './ButtonRouter';
import { getRoute } from '../utils';


const SearchBox = ({ name, clickHandler, isClicked }) => {

  const getIcons = () => {
    const icons = {
      treatment: <ContentCut className='icon'/>,
      location: <LocationOn className='icon'/>,
      date: <DateRange className='icon'/>,
      time: <AccessTime className='icon'/>
    }

    return (name.toLowerCase() in icons) ? icons[name.toLowerCase()] : null;
  }
  
  function handleSearchButtonClick(){

  }

  return (
    <Box 
      className={`search-box ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'addtl-button': ''}`}
    >
      <div className='search-box-title-icon'>
        {getIcons()}
          <div className='search-box-title'>
              <Text align="left" className='name-top' name="Select" />
              <Text align="left" className='name-bottom' name={name} onClick={() => clickHandler(name)}/>
          </div>
      </div>
      {
        name.toLowerCase() === "time" && 
        <div className='addtl-search-icon'>
            <Search className='search-button' fontSize='medium' onClick={handleSearchButtonClick}/>
        </div>
      }
    </Box>
    
  );
};

export default SearchBox;