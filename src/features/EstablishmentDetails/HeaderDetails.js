import { Grid, Chip } from '@mui/material';
import React from 'react'
import { SampleData } from './SampleData';
import Text from '../../components/Text';
import ButtonRouter from '../../components/ButtonRouter';
import {Rating} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Buttons from '@mui/material/Button';
import ServiceDialog from '../ServiceDialog/ServiceDialog';

function HeaderDetails(props) {
    const {isLoading, establishmentData} = props
    if(!isLoading){
    //console.log("establishmentData:  : ", establishmentData.data)

    }
  return (
    <>
{!isLoading && 
        <div className='mx-16'>
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <div className='text-3xl font-bold'>{establishmentData.data.establishmentName}</div>
            </Grid>
            <Grid item xs={6} md={4} className='flex justify-evenly'>
                <Buttons variant='outlined'>Pictures</Buttons>
                <ServiceDialog />
                <Buttons variant='outlined'>Review</Buttons>
                <Buttons variant='outlined' href="#about">About</Buttons>
            </Grid>
        </Grid>
        <br/>
        <Grid container spacing={1}>
            <Grid xs={10} className='flex items-center py-2'>
                <div className='text-lg font-bold px-2'>{establishmentData.data.rating}</div>
                <Rating className='' value={4} precision={0.5} readOnly />
                <div className='text-base px-2'>{'('+87+')'}</div>
                <span className='px-4'><FavoriteIcon/></span>
                <Chip label={'Opens at '+'11.00 am'} className='mx-2'/>
                <Chip label={establishmentData.data.establishmentLocation} className='mx-2'/>

                <Grid>
                    {establishmentData.data.facilities.instantBooking && <Chip className='mx-2' label={"Instant Booking"}/>}
                    {establishmentData.data.facilities.freeCancellation && <Chip className='mx-2' label={"Free Cancellation"}/>}
                </Grid>
            </Grid>
        </Grid>
        </div>
    }
    </>
    
    
  )
}

export default HeaderDetails