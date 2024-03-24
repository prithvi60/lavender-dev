import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Grid, Box, } from '@mui/material';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import CheckBox from '../../components/Checkbox';
import Dropdown from '../../components/Dropdown';
import Text from '../../components/Text';
import { accountCreated, isNewAccount } from '../../store/slices/login/loginPageSlice';
import Password from './Password';

const RegisterSide = () => {
    // TO DO: Birthdate, month and year dropdown, state management, api integration
    const [gender, setGender] = useState('');
    const [areaCode, setAreaCode] = useState('');

    const dispatch = useDispatch();

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
                <Text variant="h4" align="center" name="Register or Login" />
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
                        <Dropdown
                            value={gender}
                            onChange={handleGenderChange}
                            options={[{value: 'male', label: 'Male'},
                                {value: 'female', label: 'Female'},
                                {value: 'other', label: 'Other'},
                            ]}
                            label={"Gender"}
                        />
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
                            <Dropdown
                                value={areaCode}
                                onChange={handleAreaCodeChange}
                                options={[{value: '1', label: '+1'},
                                    {value: '44', label: '+44'},
                                    {value: '65', label: '+65'},
                                ]}
                                label={"Area Code"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField required label="Mobile Number" variant="standard" fullWidth />
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Password />
                    </Grid>
                    <Grid item xs={12} align="left">
                        <CheckBox 
                            value=""
                            label="I Agree to terms and conditions, privacy policy and terms of use"
                            onChange={() => {}}
                        />
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
                </Grid>
                
                
            </Box>

        </>
    );
}

export default RegisterSide;