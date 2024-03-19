import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { AccessTime, ContentCut, DateRange, LocationOn, Search } from '@mui/icons-material';

const SearchTreatment = ({  }) => {

  return (
    <Box 
      className={`search-box ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'addtl-button': ''}`}
      onClick={() => clickHandler(name)}
    >
     <Paper elevation={2}>
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
     </Paper>
      
        
        
    </Box>
    
  );
};

export default SearchTreatment;