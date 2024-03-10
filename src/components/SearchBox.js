import React from 'react';
import { Box, Typography } from '@mui/material';
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from '@mui/icons-material';

import './index.css';

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
      className={`b-search-box ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'b-addtl-button': ''}`}
      onClick={() => clickHandler(name)}
    >
      <div className='b-search-box-title-icon'>
        {getIcons()}
          <div className='b-search-box-title'>
              <Typography className='b-name-top'>{"Search"}</Typography>
              <Typography className='b-name-bottom'>{name}</Typography>
          </div>
      </div>
      {
        name.toLowerCase() === "time" && 
        <div className='b-addtl-search-icon'>
            <Search className='b-search-button' fontSize='medium'/>
        </div>
      }
        
        
    </Box>
    
  );
};

export default SearchBox;