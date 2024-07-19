import { Grid, Chip, styled } from '@mui/material';
import React, { useState } from 'react'
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
    const [selectedHref, setSelectedHref] = useState('pictures')
    const {isLoading, establishmentData} = props
    if(!isLoading){

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
                    <div className='text-3xl font-bold' id='SearchDetailPicture'>{establishmentData?.profile?.establishmentName}</div>
                    <div className='search-detail-chips'>
                        <a
                            onClick={() => setSelectedHref('pictures')}
                            href="#" className={selectedHref === 'pictures' ? "active" : ""}>
                            <Buttons variant='outlined'>Pictures</Buttons>
                        </a>
                        <a
                        
                            onClick={() => setSelectedHref('service')}
                            href="#SearchDetailService" className={selectedHref === 'service' ? "active" : ""}>
                             <ServiceDialog establishmentData={establishmentData}/> 
                        </a>
                        <a
                        
                            onClick={() => setSelectedHref('review')}
                            href="#SearchDetailReview" className={selectedHref === 'review' ? "active" : ""}>
                            <Buttons variant='outlined'>Review</Buttons>
                        </a>
                        <a
                            onClick={() => setSelectedHref('about')}
                            className={selectedHref === 'about' ? "active" : ""}
                            href="#SearchDetailAbout">
                            <Buttons variant='outlined'>About</Buttons>
                        </a>
                    </div>
                </div>
                <div className='search-header-details'>
                    {establishmentData?.profile?.data?.rating && <div className='text-lg font-bold px-1'>{establishmentData?.profile?.data?.rating?.ratingStar}</div>}
                    <StyledRating
                          name="customized-color"
                          value={establishmentData?.profile?.data?.rating?.ratingStar}
                          precision={0.5}
                          readOnly
                        />
                    <div className='text-base'>{'('+establishmentData?.profile?.data?.rating?.ratingCount+')'}</div>
                    <FavoriteIcon/>
                    <Chip label={'Opens at '+establishmentData?.profile?.data?.geoX} className='header-chip'/>
                    <Chip label={establishmentData?.profile?.cityCode} className='header-chip'/>
                    <div className='search-chips-container'>
                        <Grid>
                            {/* {establishmentData?.profile?.data?.facilities?.instantBooking &&  */}
                            <Chip className='mx-2' label={"Instant Booking"} value={"Instant Booking"}/>
                            {/* {establishmentData?.profile?.data?.facilities?.freeCancellation &&  */}
                            <Chip className='mx-2' label={"Free Cancellation"} value={"Free Cancellation"}/>
                        </Grid>
                    </div>
                </div>
            </div>
        }
    </>
    
    
  )
}

export default HeaderDetails