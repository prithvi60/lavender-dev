import React, { useState } from 'react';
import {
    Input,
    InputAdornment,
    IconButton,
    Typography,
    Grid,
    Box, InputLabel, Select, MenuItem, FormControl, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import CheckBox from '../../components/Checkbox';

import profile from '../../assets/profile.png';

const SingInSide = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({});

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
                        <FormControl variant="standard" fullWidth required>
                            <InputLabel>Password</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
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