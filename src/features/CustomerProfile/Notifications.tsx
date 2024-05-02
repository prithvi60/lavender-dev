import { Card, Divider, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material'
import React from 'react'

function Notifications({userInfo}) {
  return (
    <div className='mx-24 mt-10'>
        <div className='text-3xl font-bold py-4'>Notification Preferences</div>
        <Card>
            <Grid container spacing={1} sx={{padding: 4}}>
                <Grid item xs={6}>
                    <div className='text-xl font-bold p-1'>Appointment reminders</div>
                    <div className='text-xl p-1' style={{color: '#808080'}}>We will notify about your appointments on time</div>
                    <FormGroup sx={{alignContent: 'start', padding: 2}}>
                        <FormControlLabel control={<Switch color="success" checked={userInfo?.appUser?.customerSettings?.notificationSMS} />} label="Notifications via SMS" labelPlacement="start"/>
                        <FormControlLabel control={<Switch color="success" checked={userInfo?.appUser?.customerSettings?.notificationEmail}/>} label="Notifications via Mail" labelPlacement="start"/>
                        <FormControlLabel control={<Switch color="success" checked={userInfo?.appUser?.customerSettings?.notificationPush}/>} label="Notifications via Push" labelPlacement="start"/>
                    </FormGroup>
                </Grid>
                {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                <Grid item xs={6}>
                    <div className='text-xl font-bold'>Lavender promotions</div>
                    <div className='text-xl' style={{color: '#808080'}}>We send you marketing offers and news that you might find interesting</div>
                    <FormGroup sx={{alignContent: 'start', padding: 2}}>
                        <FormControlLabel control={<Switch color="success" checked={userInfo?.appUser?.customerSettings?.promotionsMail} />} label="Communications through Mail" labelPlacement="start"/>
                        <FormControlLabel control={<Switch color="success" checked={userInfo?.appUser?.customerSettings?.promotionsSMS}/>} label="Communications through SMS" labelPlacement="start"/>
                    </FormGroup>
                </Grid>
            </Grid>
        </Card>
    </div>
  )
}

export default Notifications