import { Grid, Chip, styled } from '@mui/material';
import React from 'react'
import { SampleData } from './SampleData';
import Text from '../../components/Text';
import ButtonRouter from '../../components/ButtonRouter';
import {Rating} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Buttons from '@mui/material/Button';
import ServiceDialog from '../ServiceDialog/ServiceDialog';
import './style.css'
import { NavLink } from 'react-router-dom';

function HeaderDetails(props) {
    const {isLoading, establishmentData} = props
    if(!isLoading){
    //console.log("establishmentData:  : ", establishmentData.data)

    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
      });
  return (
    <>
        {!isLoading && 
            <div className='mx-16'>
                <div className='search-header-container'>
                    <div className='text-3xl font-bold' id='SearchDetailPicture'>{establishmentData?.data?.establishmentName}</div>
                    <div className='search-detail-chips'>
                        <NavLink
                            to="#SearchDetailPicture" className={({ isActive }) => isActive ? "active" : ""}>
                            <Buttons variant='outlined'>Pictures</Buttons>
                        </NavLink>
                        <NavLink
                            to="#SearchDetailService" className={({ isActive }) => isActive ? "active" : ""}>
                            <ServiceDialog establishmentData={establishmentData}/>
                        </NavLink>
                        <NavLink
                            to="#SearchDetailReview" className={({ isActive }) => isActive ? "active" : ""}>
                            <Buttons variant='outlined'>Review</Buttons>
                        </NavLink>
                        <NavLink
                            to="#SearchDetailAbout" className={({ isActive }) => isActive ? "active" : ""}>
                            <Buttons variant='outlined'>About</Buttons>
                        </NavLink>
                    </div>
                </div>
                <div className='search-header-details'>
                    {establishmentData?.data?.rating && <div className='text-lg font-bold px-1'>{establishmentData?.data?.rating?.ratingStar}</div>}
                    <StyledRating
                          name="customized-color"
                          value={establishmentData?.data?.rating?.ratingStar}
                          precision={0.5}
                          readOnly
                        />
                    <div className='text-base'>{'('+establishmentData?.data?.rating?.ratingCount+')'}</div>
                    <FavoriteIcon/>
                    <Chip label={'Opens at '+establishmentData?.data?.geoX} className='header-chip'/>
                    <Chip label={establishmentData?.data?.establishmentLocation} className='header-chip'/>
                    <div className='search-chips-container'>
                        <Grid>
                            {establishmentData?.data?.facilities?.instantBooking && <Chip className='mx-2' label={"Instant Booking"}/>}
                            {establishmentData?.data?.facilities?.freeCancellation && <Chip className='mx-2' label={"Free Cancellation"}/>}
                        </Grid>
                    </div>
                </div>
            </div>
        }
    </>
    
    
  )
}

export default HeaderDetails