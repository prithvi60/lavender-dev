import { Button } from '@mui/material'
import React, { useState } from 'react'

export const    OnBoardFooter = ({setActiveStep}) => {
    const [home,setHome]=useState(false)
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep < 2 ? prevStep + 1 : prevStep); 
    };
    const handlePrev = () => {
        setActiveStep((prevStep) => {
            if (prevStep > 0) {
                return prevStep - 1;
            } else {
                setHome(true);
                return prevStep;
            }
        }); 
    };
    if (home) {
        window.location.href = "/business";
    }
    return (
        <footer className='w-full px-4 flex justify-between items-center border-2 absolute bottom-0 bg-white' style={{height: "10vh"}}>
            <Button variant="text" size='large' color='secondary' sx={{textTransform:"none", fontWeight: 'bold'}} onClick={handlePrev}>Back</Button>
            <Button variant="contained" size='large' color='primary' onClick={handleNext} sx={{textTransform:"none"}}>Proceed</Button>
        </footer>
    )
}
