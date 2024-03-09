import React from 'react';
import './index.css';
import { Box, Paper, Typography } from '@mui/material';

import './index.css';
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from '@mui/icons-material';

const SearchTreatment = ({  }) => {

  return (
    <Box 
      className={`searchBox ${isClicked ? 'selected' : ''} ${name.toLowerCase() === "time" ? 'addtlButton': ''}`}
      onClick={() => clickHandler(name)}
    >
     <Paper elevation={2}>
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
     </Paper>
      
        
        
    </Box>
    
  );
};

export default SearchTreatment;