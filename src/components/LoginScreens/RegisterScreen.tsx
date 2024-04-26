import { Grid, Box } from '@mui/material';
import Button from '../Button';
import TextField from '../TextField';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAddUser } from '../../store/slices/admin/userAdminSlice';
import { isNewAccount, setAccountCreated } from '../../store/slices/login/loginPageSlice';
import Dropdown from '../Dropdown';
import Text from '../Text';
import Password from '../../features/Login/Password';
import CheckBox from '../Checkbox';

function RegisterScreen() {
    // TO DO: Birthdate, month and year dropdown, state management, api integration
    const { addUser } = useSelector((state: any) => state.userAdmin);

    const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
    const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const navigate = useNavigate();
    const goBackToPreviousPage = () => {
        navigate(-1);
    };

    const [data, setData] = useState({
        gender: '',
        areaCode: '',
        mobileNumber: '',
        fullName: '',
        email: '',
        password: '',
        agreeToTerms: false,
        birthMonth: '',
        birthDate: '',
        birthYear: '',
        showPassword: false,
    });

    const dispatch = useDispatch();

    const handleOnChange = (key, value) => {
        const dataTemp = {...data};
        dataTemp[key] = value;
        setData(dataTemp);
    }

    const handleGenderChange = (event) => {
        handleOnChange('gender', event?.target?.value);
    };
    

    const handleAreaCodeChange = (event) => {
        handleOnChange('areaCode', event?.target?.value);
    };

    const handleClickShowPassword = (value) => {
        handleOnChange('showPassword', value);
    }

    const handleClickCreate = () => {
        if (addUser) {
            dispatch(setAddUser({addUser: false}));
            goBackToPreviousPage();
        } else {
            dispatch(isNewAccount({ newAccount: false }));
            dispatch(setAccountCreated({ accountCreated: true }));
        }
    }
  return (
    <div>
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
                            onChange={handleOnChange}
                            value={data?.fullName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Dropdown
                            value={data?.gender}
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
                            onChange={handleOnChange}
                            value={data?.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3}>
                                <Dropdown
                                    value={data?.areaCode}
                                    onChange={handleAreaCodeChange}
                                    options={[{value: '1', label: '+1'},
                                        {value: '44', label: '+44'},
                                        {value: '65', label: '+65'},
                                    ]}
                                    label={"Area Code"}
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    required
                                    label="Mobile Number"
                                    variant="standard"
                                    fullWidth
                                    id="mobileNumber"
                                    onChange={handleOnChange}
                                    value={data?.mobileNumber}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} sm={4}>
                                <TextField
                                    label="Date of birth"
                                    type="number"
                                    InputProps={{ inputProps: { min: 1, max: 31 } }}
                                    value={data?.birthDate}
                                    id={"birthDate"}
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5}>
                                <Dropdown
                                    value={data?.birthMonth}
                                    onChange={(e) => handleOnChange('birthMonth', e.target?.value)}
                                    options={MONTHS?.map((month) => {
                                        const monthStr = new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
                                        return {
                                            value: month, label: monthStr
                                        }
                                    })}
                                    label={"Month"}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Dropdown
                                    value={data?.birthYear}
                                    onChange={(e) => handleOnChange('birthYear', e.target?.value)}
                                    options={YEARS?.map((year) => {
                                        return {
                                            value: year, label: year
                                        }
                                    })}
                                    label={"Year"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Password
                            showPassword={data?.showPassword}
                            setShowPassword={handleClickShowPassword}
                            password={data?.password}
                            onChange={handleOnChange}
                            id="password"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <CheckBox 
                            value=""
                            label="I Agree to terms and conditions, privacy policy and terms of use"
                            onChange={handleOnChange}
                            id="areaCode"
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
    </div>
  )
}

export default RegisterScreen