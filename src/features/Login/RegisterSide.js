import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Input,
    InputAdornment,
    IconButton,
    Typography,
    Grid,
    Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import CheckBox from '../../components/Checkbox';
import { accountCreated, isNewAccount } from '../../store/slices/login/loginPageSlice';

const RegisterSide = () => {
    // TO DO: Birthdate, month and year dropdown, state management, api integration
    const [showPassword, setShowPassword] = useState(false);
    const [gender, setGender] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [data, setData] = useState({});

    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleAreaCodeChange = (event) => {
        setAreaCode(event.target.value);
    };

    const handleClickCreate = () => {
        dispatch(isNewAccount({ newAccount: false }));
        dispatch(accountCreated({ accountCreated: true }));
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">Register or Login</Typography>
            </Grid>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            autoComplete="given-name"
                            name="fullName"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={handleGenderChange}
                                label="Gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <FormControl variant="standard" fullWidth required>
                                <InputLabel>Area Code</InputLabel>
                                <Select
                                    value={areaCode}
                                    onChange={handleAreaCodeChange}
                                    label="Area Code"
                                >
                                    <MenuItem value="1">+1</MenuItem>
                                    <MenuItem value="44">+44</MenuItem>
                                    <MenuItem value="61">+61</MenuItem>
                                    {/* Add more area codes as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField required label="Mobile Number" variant="standard" fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
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
                        <CheckBox 
                            value=""
                            label="I Agree to terms and conditions, privacy policy and terms of use"
                            onChange={() => {}}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        className='contained'
                        name={"Create an account"}
                        onClick={handleClickCreate}
                    />
                </Grid>
                
            </Box>

        </>
    );
}

export default RegisterSide;