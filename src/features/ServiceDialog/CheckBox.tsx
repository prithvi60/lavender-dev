import React, { useState } from 'react';
import { updateCheckOut, resetCheckOut } from '../../store/slices/checkOutPageSlice';
import {
  useDispatch,
} from 'react-redux';
import GetIcon from '../../assets/Icon/icon';

function CheckBox({ optionName, salePrice, duration, setBtnValue, btnValue, setBtnVariant }) {
  const [isChecked, setIsChecked] = useState(false);
  const disPatch = useDispatch()

  function handleSelectBtnClick(serviceName, finalPrice, serviceDuration) {
    
    setIsChecked((prev) => !prev)
    let checkOutObj = {
      'serviceName': serviceName,
      'finalPrice': finalPrice,
      'serviceDuration': serviceDuration
    }
    console.log("checkOutObj : ", checkOutObj)
    if (btnValue === 'Select') {
      // addItemsToCheckOut(checkOutObj)
      disPatch(updateCheckOut(checkOutObj))
      setBtnValue("Deselect")
      setBtnVariant("contained")
    }
    else {
      // removeItemsToCheckOut(checkOutObj)
      disPatch(resetCheckOut(checkOutObj))
      
      setBtnValue("Select")
      setBtnVariant("outlined")
    }
  }

  return (
    <>
    <div className='cursor-pointer'>
      {isChecked 
      ? <GetIcon iconName='SelectedIcon'  onClick={() => handleSelectBtnClick(optionName, salePrice, duration)}/>
      : <GetIcon iconName='PlusIcon'  onClick={() => handleSelectBtnClick(optionName, salePrice, duration)}/>}
    </div>
    </>
  );
}

export default CheckBox;
