import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Typography } from '@mui/material';
import { TabBoxGrid, TabsWithIcon } from '../../components/componentHelpers';

import SearchSalon from './components/SearchSalon';
import SearchForm from './components/SearchForm';


import './index.css';

const SearchPage = () => {
  const {treatment, location} = useSelector((state) => state.searchPage);
  const [value, setValue] = useState(0);
  const [inputs, setInputs] = useState({ treatment, location });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setInputs(prev => ({...prev, treatment, location}))
  }, [treatment, location]);

  return (
    <>
        <TabBoxGrid
            tab1={
                <Card variant="outlined">
                    <Box className="tabBox">
                        <TabsWithIcon
                            value={value}
                            handleChange={handleChange}
                            treatment={<SearchForm label="Treatment" />}
                            salon={<SearchSalon label="Salon" />}
                        />
                    </Box>
                </Card>
            }
            tab2={<Box>
              <Typography>{inputs?.treatment}</Typography>
              <Typography>{inputs?.location}</Typography>
            </Box>}
            className2="bannerBox"
            className1="searchBox"
            classNameGrid="tabBoxGrid"
        />
        
    </>
    
  );
};

export default SearchPage;