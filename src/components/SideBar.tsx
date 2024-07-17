import React, { useState } from 'react'
import { BUSINESS_NAV } from '../constants/constants'
import GetIcon from '../assets/Icon/icon'
import { Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom';

function SideBar({activeField,onChange}) {

  return (
    <div style={{minHeight: '800px', maxHeight: '100%'}}>
        <div className='bg-white-500 w-16 flex flex-col content-between'>{
            BUSINESS_NAV.map((field, index) => {
                return (
                    <div key={index} className={`px-4 py-3 ${activeField === field.label ? 'bg-primary' : 'bg-white'}`} onClick={() => onChange(field.label)}>
                      <Tooltip title={field.label} TransitionComponent={Zoom}  placement="right" arrow>
                        <div >
                          <GetIcon isActive={activeField === field.label} iconName={field.iconName} />
                        </div>
                    </Tooltip>
                    </div>
                )
            })
        }</div>
    </div>
    
  )
}

export default SideBar