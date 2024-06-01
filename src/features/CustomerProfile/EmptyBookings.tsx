import { Card } from '@mui/material'
import React from 'react'
import Text from '../../components/Text'
import GetIcon from '../../assets/Icon/icon'

function EmptyBookings({noAppointmentsMessage}) {
  return (
    
        <Card sx={{backgroundColor: '#FFFBF3', borderRadius: 6, border: '1px solid #CCCCCC', boxShadow: 'none'}}>
            <div className='p-8'>
                <GetIcon
                  className="flex items-center gap-3 h-fit urbanist-font text-lg font-semibold w-full md:w-8/12"
                  iconName="Team"
                  text={noAppointmentsMessage}
                  sz={{size: "10px"}}
                />
            </div>
        </Card>
  )
}

export default EmptyBookings