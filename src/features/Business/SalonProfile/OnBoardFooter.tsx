import { Button } from '@mui/material'
import React from 'react'

export const OnBoardFooter = () => {
    return (
        <footer className='w-full px-4 flex justify-between items-center border-2 absolute bottom-0' style={{height: "10vh"}}>
            <Button variant="contained" size='large' color='info'>Back</Button>
            <Button variant="contained" size='large' color='primary'>Next</Button>
        </footer>
    )
}
