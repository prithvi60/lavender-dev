import { Grid, Chip, styled, IconButton, Box } from '@mui/material';
import React, { useState } from 'react'
import Text from '../../components/Text';
import ButtonRouter from '../../components/ButtonRouter';
import {Rating} from '@mui/material';
import Buttons from '@mui/material/Button';
import ServiceDialog from '../ServiceDialog/ServiceDialog';
import './style.css'
import GetIcon from '../../assets/Icon/icon';

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
            <Box sx={{mx: 8, '@media (max-width: 640px)': {mx: 4}}}>
                <div className='search-header-container'>
                    <Box className='text-3xl font-bold' id='SearchDetailPicture'>{establishmentData?.profile?.establishmentName}</Box>
                    <Box className='search-detail-chips' sx={{'@media (max-width: 640px)': {marginTop: '60px !important'}, '@media (max-width: 550px)': {marginTop: '100px !important'}}}>
                        <a
                            onClick={() => setSelectedHref('pictures')}
                            href="#" className={selectedHref === 'pictures' ? "active" : ""}>
                            <Buttons sx={styles.btn} variant='outlined'>Pictures</Buttons>
                        </a>
                        <a
                        
                            onClick={() => setSelectedHref('service')}
                            href="#SearchDetailService" className={selectedHref === 'service' ? "active" : ""}>
                             <ServiceDialog establishmentData={establishmentData}/> 
                        </a>
                        <a
                        
                            onClick={() => setSelectedHref('review')}
                            href="#SearchDetailReview" className={selectedHref === 'review' ? "active" : ""}>
                            <Buttons sx={styles.btn} variant='outlined'>Review</Buttons>
                        </a>
                        <a
                            onClick={() => setSelectedHref('about')}
                            className={selectedHref === 'about' ? "active" : ""}
                            href="#SearchDetailAbout">
                            <Buttons sx={styles.btn} variant='outlined'>About</Buttons>
                        </a>
                    </Box>
                </div>
                <div className='search-header-details'>
                    {/* {establishmentData?.profile?.data?.rating && <div className='text-lg font-bold px-1'>{establishmentData?.profile?.data?.rating?.ratingStar}</div>} */}
                    {/* <div className='text-lg font-bold px-1'>{"4.0"}</div> */}
                    <StyledRating
                          name="customized-color"
                        //   value={establishmentData?.profile?.data?.rating?.ratingStar}
                          value={4}
                          precision={0.5}
                          readOnly
                        />
                    {/* <div className='text-base'>{'('+establishmentData?.profile?.data?.rating?.ratingCount+')'}</div> */}
                    {establishmentData?.profile?.data?.rating?.ratingCount && <div className='text-base'>{'('+establishmentData?.profile?.data?.rating?.ratingCount+')'}</div>}
                    <IconButton>
                        <GetIcon iconName="heartFilled"/>
                    </IconButton>
                    <Chip label={'Opens at '+establishmentData?.profile?.data?.geoX} sx={{fontSize: '14px'}} className='header-chip'/>
                    <Chip label={establishmentData?.profile?.cityCode} sx={{fontSize: '14px'}} className='header-chip'/>
                    <div className='search-chips-container'>
                        <Grid>
                            {/* {establishmentData?.profile?.data?.facilities?.instantBooking &&  */}
                            <Chip sx={{fontSize: '14px'}} label={"Instant Booking"} value={"Instant Booking"}/>
                            {/* {establishmentData?.profile?.data?.facilities?.freeCancellation &&  */}
                            <Chip sx={{fontSize: '14px'}} label={"Free Cancellation"} value={"Free Cancellation"}/>
                        </Grid>
                    </div>
                </div>
            </Box>
        }
    </>
    
    
  )
}

export default HeaderDetails

const styles = {
    btn: {
      color: '#FFFFFF',
      backgroundColor: '#825FFF',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      padding: '10px 20px 10px 20px',
      borderRadius: '10px',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#5A3EBF',
      }
    },
  }