import React, { useState } from 'react';
import { updateCheckOut, resetCheckOut } from '../../store/slices/checkOutPageSlice';
import {
  useDispatch,
} from 'react-redux';
import GetIcon from '../../assets/Icon/icon';

function CheckBox({ optionId, optionName, salePrice, duration, setBtnValue, btnValue, setBtnVariant }) {
  const [isChecked, setIsChecked] = useState(false);
  const disPatch = useDispatch()

  function handleSelectBtnClick(serviceId, serviceName, finalPrice, serviceDuration) {
    
    setIsChecked((prev) => !prev)
    let checkOutObj = {
      'serviceId': serviceId,
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
      ? <GetIcon iconName='SelectedIcon'  onClick={() => handleSelectBtnClick(optionId, optionName, salePrice, duration)}/>
      : <GetIcon iconName='PlusIcon'  onClick={() => handleSelectBtnClick(optionId, optionName, salePrice, duration)}/>}
    </div>
    </>
  );
}

export default CheckBox;
