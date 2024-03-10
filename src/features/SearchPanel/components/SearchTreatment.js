import React from 'react';
import './index.css';
import { Box, Paper, Typography } from '@mui/material';

import './index.css';
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from '@mui/icons-material';

const SearchTreatment = ({  }) => {

  return (
    <Box 
      className={`b-search-box ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'b-addtl-button': ''}`}
      onClick={() => clickHandler(name)}
    >
     <Paper elevation={2}>
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
     </Paper>
      
        
        
    </Box>
    
  );
};

export default SearchTreatment;