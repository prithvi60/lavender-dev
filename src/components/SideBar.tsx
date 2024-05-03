import React, { useState } from 'react'
import { BUSINESS_NAV } from '../constants/constants'
import GetIcon from '../assets/Icon/icon'
import { Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom';

function SideBar() {
  const [active, setActive] = useState("Home")


  return (
    <div className='bg-white-500 w-16 flex flex-col items-center content-between'>{
        BUSINESS_NAV.map((field) => {
            return (
                <div className={`px-4 py-2.5 ${active === field.label ? 'bg-primary' : 'bg-white'}`} onClick={() => setActive(field.label)}>
                  <Tooltip title={field.label} TransitionComponent={Zoom}  placement="right" arrow>
                    <div >
                      <GetIcon isActive={active === field.label} iconName={field.iconName} />
                    </div>
                 </Tooltip>
                </div>
            )
        })
    }</div>
  )
}

export default SideBar