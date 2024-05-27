import { Card, Divider, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material'
import React from 'react'

function Notifications({userInfo}) {
  return (
    <div className='mt-10'>
        <div className='text-3xl font-bold py-4'>Notification Preferences</div>
        <Card sx={{boxShadow: '0 1px 6px rgba(0,0,0,0.15)', borderRadius: '20px'}}>
            <div className='p-5 lg:p-8 flex flex-col lg:flex-row'>
                <div className='w-full lg:w-5/12 flex flex-col gap-4'>
                    <div className='text-xl font-bold'>Appointment reminders</div>
                    <div className='text-xl' style={{color: '#808080'}}>We will notify about your appointments on time</div>
                    <FormGroup>
                        <FormControlLabel className='justify-between !m-0' control={<Switch className='toggle-ui' color="success" checked={userInfo?.appUser?.customerSettings?.notificationSMS} />} label="Notifications via SMS" labelPlacement="start"/>
                        <FormControlLabel className='justify-between !m-0' control={<Switch className='toggle-ui' color="success" checked={userInfo?.appUser?.customerSettings?.notificationEmail}/>} label="Notifications via Mail" labelPlacement="start"/>
                        <FormControlLabel className='justify-between !m-0' control={<Switch className='toggle-ui' color="success" checked={userInfo?.appUser?.customerSettings?.notificationPush}/>} label="Notifications via Push" labelPlacement="start"/>
                    </FormGroup>
                </div>
                <div className='w-full lg:w-2/12 flex py-3 lg:py-0 justify-center'>
                    <div className='bg-zinc-300 h-px w-full lg:w-px lg:h-full'></div>
                </div>
                <div className='w-full lg:w-5/12 flex flex-col gap-4'>
                    <div className='text-xl font-bold'>Lavender promotions</div>
                    <div className='text-xl' style={{color: '#808080'}}>We send you marketing offers and news that you might find interesting</div>
                    <FormGroup>
                        <FormControlLabel className='justify-between !m-0' control={<Switch className='toggle-ui' color="success" checked={userInfo?.appUser?.customerSettings?.promotionsMail} />} label="Communications through Mail" labelPlacement="start"/>
                        <FormControlLabel className='justify-between !m-0' control={<Switch className='toggle-ui' color="success" checked={userInfo?.appUser?.customerSettings?.promotionsSMS}/>} label="Communications through SMS" labelPlacement="start"/>
                    </FormGroup>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default Notifications