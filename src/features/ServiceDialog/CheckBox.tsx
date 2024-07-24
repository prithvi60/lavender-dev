import React from 'react';
import GetIcon from '../../assets/Icon/icon';
import { IconButton } from '@mui/material';

function CheckBox({ optionId, isSelected, onOptionSelect }) {
  return (
    <div className='cursor-pointer'>
      {isSelected
        ? <IconButton onClick={onOptionSelect} >
            <GetIcon iconName='SelectedIcon' />
          </IconButton>
        : <IconButton  onClick={onOptionSelect}>
            <GetIcon iconName='PlusIcon' />
          </IconButton>
      }
    </div>
  );
}

export default CheckBox;
