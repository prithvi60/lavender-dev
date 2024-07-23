import React from 'react';
import { useSelector } from 'react-redux';
import { convertTo_HH_AM } from '../utils/TimeFormat.ts';
import { IconButton } from '@mui/material';
import GetIcon from '../assets/Icon/icon.tsx';

const NavFilter = ({setshowSearchBar}) => {

  const { treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
    (state: any) => state.searchPage
  );

  const onClickHandle = () =>{
    setshowSearchBar(prev=> !prev)
  }

  return (
    <div id='navdiv' className='filtered-panel ml-auto cursor-pointer' onClick={()=> onClickHandle()}>
      <div className='filtered-items'>
        {treatmentList?.length > 0
        ? 
        (
          <p>{treatmentList?.toString().replaceAll(',', ', ')}</p>

        )
        : 
        (
          <p>treatment</p>
        )}
      </div>
      <div className='filtered-items'>
        {locationList?.length > 0
        ? 
        (
          <p>{locationList?.toString().replaceAll(',', ', ')}</p>
        )
        :
        (
          <p>location</p>
        )}
      </div>
      <div className='filtered-items'>
        {locationList?.length > 0
        ? 
        (
        <p>{selectedDate}</p>
        )
        :
        (
          <p>date</p>
        )}
      </div>
      <div className='filtered-items'>
        <p>
          {
            SelectedTime?.from
          }
        </p> 
        <div className='icon-wrapper'>
        <IconButton>
          <GetIcon iconName='MainSearch'/>
        </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NavFilter;