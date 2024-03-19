import React from 'react';
import { Box, Typography } from '@mui/material';
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from '@mui/icons-material';

const SearchBox = ({ name, clickHandler, isClicked }) => {

  const getIcons = () => {
    const icons = {
      treatment: <ContentCut />,
      location: <LocationOn />,
      date: <DateRange />,
      time: <AccessTime />
    }

    return (name.toLowerCase() in icons) ? icons[name.toLowerCase()] : null;
  }

  return (
    <Box 
      className={`search-box ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'addtl-button': ''}`}
      onClick={() => clickHandler(name)}
    >
      <div className='search-box-title-icon'>
        {getIcons()}
          <div className='search-box-title'>
              <Typography className='name-top'>{"Search"}</Typography>
              <Typography className='name-bottom'>{name}</Typography>
          </div>
      </div>
      {
        name.toLowerCase() === "time" && 
        <div className='addtl-search-icon'>
            <Search className='search-button' fontSize='medium'/>
        </div>
      }
        
        
    </Box>
    
  );
};

export default SearchBox;