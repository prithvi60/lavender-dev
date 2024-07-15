import React from 'react';
import GetIcon from '../../assets/Icon/icon';

function CheckBox({ optionId, isSelected, onOptionSelect }) {
  return (
    <div className='cursor-pointer'>
      {isSelected
        ? <GetIcon iconName='SelectedIcon' onClick={onOptionSelect} />
        : <GetIcon iconName='PlusIcon' onClick={onOptionSelect} />}
    </div>
  );
}

export default CheckBox;
