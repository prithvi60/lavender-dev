import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Grid, Box, } from '@mui/material';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import CheckBox from '../../components/Checkbox';
import Dropdown from '../../components/Dropdown';
import Text from '../../components/Text';
import { setAccountCreated, isNewAccount } from '../../store/slices/login/loginPageSlice';
import Password from './Password';
import wrappedLayout from './wrappedLayout';
import { setAddUser } from '../../store/slices/admin/userAdminSlice';
import RegisterScreen from '../../components/LoginScreens/RegisterScreen.tsx';

const Register = () => {
    
    return (
        <>
            <RegisterScreen/>
        </>
    );
}

export default wrappedLayout(Register);