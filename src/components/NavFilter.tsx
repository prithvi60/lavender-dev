import React from 'react';
import { Search } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { convertTo_HH_AM } from '../utils/TimeFormat.ts';

const NavFilter = () => {

  const { treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
    (state:any) => state.searchPage
  );
  
  return (
    <div className='filtered-panel ml-auto'>
        <div className='filtered-items'>
        <p>{treatmentList?.toString().replaceAll(',', ', ')}</p>
        </div>
        <div className='filtered-items'>
        <p>{locationList?.toString().replaceAll(',', ', ')}</p>
        </div>
        <div className='filtered-items'>
        <p>{selectedDate}</p>
        </div>
        <div className='filtered-items'>
        <p>{}</p> <div className='icon-wrapper'><Search /></div>
        </div>
    </div>
  );
};

export default NavFilter;