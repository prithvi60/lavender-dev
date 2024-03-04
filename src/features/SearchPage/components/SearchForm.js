import React, {useState} from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar, SearchButton } from '../../../components/componentHelpers';
import DateSearchBar from './DateSearchBar';
import { saveSearchInputs } from '../../../store/slices/searchPageSlice';

const SearchForm = () => {
  const dispatch = useDispatch();
  const {treatment, location} = useSelector((state) => state.searchPage);
  const [inputs, setInputs] = useState({ treatment, location });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveSearchInputs(inputs));
  };

  const handleChange = (e) => {
    const inputsTemp = {...inputs};
    inputsTemp[e.target.name] = e.target.value;
    setInputs(inputsTemp);
  }

  const handleClear = (e) => {
    const inputsTemp = {...inputs};
    inputsTemp[e.target.name] = "";
    setInputs(inputsTemp);
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
        <SearchBar
          value={inputs?.treatment}
          placeholder={"treatment"}
          icon={"search"}
          onClear={handleClear}
          onChange={handleChange}
        />
        <SearchBar
          value={inputs?.location}
          placeholder={"location"}
          icon={"location"}
          onClear={handleClear}
          onChange={handleChange}
        />
        <DateSearchBar />
        <div className='searchBar'>
            <SearchButton />
        </div>
        
    </Box>
  );
};

export default SearchForm;