import React from 'react';
import {
    Typography,
    Grid,
    Box,
    Link } from '@mui/material';
import Password from './Password';
import Button from '../../components/Button';

import profile from '../../assets/profile.png';

const SingInSide = () => {
    const handleSubmit = () => { }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">Welcome back</Typography>
                <Typography variant="h4" align="center">Olivia Thompson!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <img src={profile} alt="Logo" style={{ width: '20%' }} />
                </Box>
            </Grid>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Password />
                    </Grid>
                    <Grid item xs={12} align="left">
                        <Link href="#" variant="body2">
                            Forgot your password ?
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            className='contained'
                            name={"Continue"}
                        />
                    </Grid>
                </Grid>
            </Box>

        </>
    );
}

export default SingInSide;