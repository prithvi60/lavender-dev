import React from 'react';
import './index.css';
import { Box, Typography } from '@mui/material';

import './index.css';
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
      className={`searchBox ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'addtlButton': ''}`}
      onClick={() => clickHandler(name)}
    >
      <div className='searchBoxTitleIcon'>
        {getIcons()}
          <div className='searchBoxTitle'>
              <Typography className='nameTop'>{"Search"}</Typography>
              <Typography className='nameBottom'>{name}</Typography>
          </div>
      </div>
      {
        name.toLowerCase() === "time" && 
        <div className='addtlSearchIcon'>
            <Search className='searchButton' fontSize='medium'/>
        </div>
      }
        
        
    </Box>
    
  );
};

export default SearchBox;