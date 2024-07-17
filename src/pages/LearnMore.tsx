import React from 'react'
import '../styles/landing.css'
import Text from '../components/Text'
import Button from '../components/Button'
import { Box } from '@mui/material'
function LearnMore() {
    return (
        <div className='learn-more text-center mt-12 mx-2'>
            <Box sx={{display: 'flex', justifyContent: 'center',  padding: '10px'}}>
                <Text sx={styles.header} name={'Discover salons to add to your self-care routine'}/>

            </Box>
            
            <Box sx={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
                <Text name={"We prioritize your convenience and aim to create a seamless and relaxing experience from booking to service delivery."} sx={styles.subHeader}/>
            </Box>
            <Box sx={{padding: '10px'}}>
                <Button sx={styles.buttonStyles} variant='contained' name={"Learn more"}></Button>
            </Box>
        </div>
    )
}

export default LearnMore

const styles = {
    header: {
      fontSize: '45px',
      fontWeight: 700,
      color: '#4D4D4D',
      lineHeight: '54px',
      maxWidth: '505px',
    },
    subHeader: {
      fontSize: '20px',
      fontWeight: 400,
      color: '#000000',
      lineHeight: '24px',
      maxWidth: '607px',
    },
    buttonStyles : {
        width: '120px', 
        height: '37px', 
        fontFamily: 'Urbanist',
        borderRadius: '10px',
        padding: "10px, 40px, 10px, 40px !important",
        gap: '10px'
    }
  }