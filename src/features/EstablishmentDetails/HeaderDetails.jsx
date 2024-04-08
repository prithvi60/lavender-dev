import { Grid, Chip } from '@mui/material';
import React from 'react'
import { SampleData } from './SampleData';
import Text from '../../components/Text';
import ButtonRouter from '../../components/ButtonRouter';
import {Rating} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '../../components/Button';

function HeaderDetails(props) {
    const {data} = props;
    console.log("data : ", SampleData)
  return (
    <div className='mx-16'>
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <div className='text-3xl font-bold'>{SampleData[0].establishmentName}</div>
            </Grid>
            <Grid item xs={6} md={4} className='flex justify-evenly'>
                <ButtonRouter name={"Pictures"} variant='' to=""/>
                <ButtonRouter name={"Services"} to=""/>
                <ButtonRouter name={"Review"} to=""/>
                <ButtonRouter name={"About"} to=""/>
            </Grid>
        </Grid>
        <br/>
        <Grid container spacing={1}>
            <Grid xs={10} className='flex items-center py-2'>
                <div className='text-lg font-bold px-2'>{SampleData[0].averageRating}</div>
                <Rating className='' value={SampleData[0].averageRating} precision={0.5} readOnly />
                <div className='text-base px-2'>{'('+SampleData[0].ratingCount+')'}</div>
                <span className='px-4'><FavoriteIcon/></span>
                <Chip label={'Opens at '+SampleData[0].establishmentOpeningTime} className='mx-2'/>
                <Chip label={SampleData[0].establishmentGeoLocation} className='mx-2'/>

                <Grid>
                    {SampleData[0].instantBooking && <Chip className='mx-2' label={"Instant Booking"}/>}
                    {SampleData[0].freeCancellation && <Chip className='mx-2' label={"Free Cancellation"}/>}
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default HeaderDetails