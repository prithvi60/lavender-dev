import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Checkbox, Button, FormControlLabel, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Grid, Snackbar, IconButton, Modal, CircularProgress, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import wrappedLayout from './wrappedLayout';
import Text from '../../../components/Text';
import GetIcon from '../../../assets/Icon/icon';
import endpoint from '../../../api/endpoints';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px",
    boxShadow: 24,
    p: 4,
    borderradius: "2px",
};
const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    areaCode: yup.string().required('Area code is required'),
    mobileNumber: yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    //userType: yup.string().required('User type is required'),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    accept: yup.bool().oneOf([true], 'Field must be checked'),
});

const RegisterBusinessPage = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState<Dayjs | null>(null);
    const [loading, setLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');


    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen((prev) => !prev);
        navigate("/business/login");
    };

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            
            const response = await endpoint.userRegister(payload);

            if (!response?.data?.success) {
                setOpen((prev) => !prev);
                setMessage(`ErrorCode : ${response.data.errorCode} ${response?.data?.data}`)
            }
            else {
                setOpen((prev) => !prev);
                setMessage("user created successfully.")
            }
            return response;
        },
        onSuccess: (response: any) => {
            setLoading(false);
        },
        onError: (response: any) => {
            alert('Register unsuccess')
        },
        onSettled: () => {

        }
    });

    const onSubmit = (data) => {
        const payLoad = {
            "userType": "BU",
            "fullName": data?.fullName,
            "emailAddress": data?.email,
            "password": data?.password,
            "mobileCountryCode": data?.areaCode,
            "mobileNumber": data?.mobileNumber,
            "dob": data?.dateOfBirth
        }
        setLoading(true)
        mutation.mutate(payLoad)
    };
    const [showPassword, setShowPassword] = useState(false)
    const [dobError, setDobError] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    // const submitForm = () => {
    //     if (document.querySelectorAll('[name="dateOfBirth"]')[0]?.value == "") {
    //         setDobError(true);
    //     } else {
    //         setDobError(false);
    //     }
    // };

    const submitForm = () => {
        const dateOfBirthElement = document.querySelector('[name="dateOfBirth"]') as HTMLInputElement | null;

        if (dateOfBirthElement && dateOfBirthElement.value === "") {
            setDobError(true);
        } else {
            setDobError(false);
        }
    };

    // useEffect(() => {
    //     document.getElementById("dobContainer").addEventListener("focusout", (e)=> {
    //     const a =document.getElementById("dobContainer");
    //     if (!a.querySelectorAll('[name="dateOfBirth"]')[0].value) {
    //         setDobError(true);
    //     } else {
    //         setDobError(false);
    //     }
    // })
    // }, [])

    useEffect(() => {
        const dobContainer = document.getElementById("dobContainer");

        if (dobContainer) {
            dobContainer.addEventListener("focusout", (e) => {
                const inputElement = dobContainer.querySelector('[name="dateOfBirth"]') as HTMLInputElement | null;

                if (inputElement && !inputElement.value) {
                    setDobError(true);
                } else {
                    setDobError(false);
                }
            });
        }

        // Optionally, you might want to clean up the event listener
        return () => {
            if (dobContainer) {
                dobContainer.removeEventListener("focusout", () => { });
            }
        };
    }, []);

    return (
        <div>


            <Grid>
                <Text variant="h4" align="center" name="Register or Login" />
            </Grid>

            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        !loading
                            ?
                            (
                                <form onSubmit={handleSubmit((data) => { onSubmit(data); })}>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="fullName"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    {...field}
                                                    label="Full Name"
                                                    variant="standard"
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    {...field}
                                                    label="Email"
                                                    variant="standard"
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    {/* <Grid item xs={12}>
                                        <Controller
                                            name="userType"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <FormControl error={!!errors.userType} fullWidth>
                                                    <InputLabel>User Type</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        {...field}
                                                        label="User Type"
                                                        error={!!errors.userType}
                                                        variant="standard"

                                                    >
                                                        <MenuItem value="OC">Customer</MenuItem>
                                                        <MenuItem value="BU">Business</MenuItem>
                                                    </Select>
                                                    <FormHelperText>{errors.userType?.message}</FormHelperText>
                                                </FormControl>
                                            )}
                                        />
                                    </Grid> */}

                                    <Grid sx={{ display: 'flex', padding: '10px', paddingLeft: "0px" }} xs={12}>

                                        <Grid item xs={4}>
                                            <Controller
                                                name="areaCode"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <FormControl error={!!errors.areaCode} fullWidth>
                                                        <InputLabel>Area Code</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            {...field}
                                                            label="Area Code"
                                                            error={!!errors.areaCode}
                                                            variant="standard"
                                                            MenuProps={{ MenuListProps: { disablePadding: true } }}
                                                        >
                                                            <MenuItem value="+1">+1</MenuItem>
                                                            <MenuItem value="+2">+2</MenuItem>
                                                            <MenuItem value="+3">+3</MenuItem>
                                                            <MenuItem value="+4">+4</MenuItem>
                                                            <MenuItem value="+5">+5</MenuItem>
                                                        </Select>
                                                        <FormHelperText>{errors.areaCode?.message}</FormHelperText>
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>

                                        <Grid xs={8}>
                                            <Controller
                                                name="mobileNumber"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        inputProps={{
                                                            style: {
                                                                marginTop: 10
                                                            }
                                                        }}
                                                        fullWidth
                                                        {...field}
                                                        label="Mobile Number"
                                                        variant="standard"
                                                        error={!!errors.mobileNumber}
                                                        helperText={errors.mobileNumber?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} id='dobContainer'>
                                        <Controller
                                            name="dateOfBirth"

                                            control={control}
                                            defaultValue={new Date()}
                                            render={({ field }) => (
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label="Date of birth" {...field} value={value} sx={{ width: '100%' }} slotProps={{ textField: { variant: 'standard', } }} />
                                                </LocalizationProvider>
                                            )}
                                        />
                                        {dobError && <p style={{ color: "#d32f2f", fontSize: "0.75rem", float: "left", paddingTop: "5px", margin: "0" }}>Enter valid date</p>}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    fullWidth
                                                    {...field}
                                                    label="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    variant="standard"
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                    InputProps={{
                                                        endAdornment: (<InputAdornment position="end">
                                                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton></InputAdornment>),
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl error={!!errors.accept} >
                                            <FormControlLabel
                                                sx={{ textAlign: 'left' }}
                                                control={
                                                    <Controller
                                                        name="accept"
                                                        control={control}
                                                        defaultValue={false}
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                {...field}
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'Accept terms and conditions' }}
                                                            />
                                                        )}
                                                    />
                                                }
                                                label="I Agree to terms and condition, privacy policy and terms of use"
                                            // error={!!errors.accept}
                                            />
                                            <FormHelperText>{errors.accept?.message}</FormHelperText>
                                        </FormControl>

                                    </Grid>


                                    <Grid item xs={12}>
                                        <Button onClick={submitForm} type="submit" variant="contained" color="primary" sx={styles.btn}>
                                            Create an account
                                        </Button>
                                    </Grid>

                                </form>
                            )
                            :
                            (
                                <div>
                                    <CircularProgress sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                                </div>
                            )
                    }

                </Grid>
            </Box>

            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="rounded-3xl filter-box">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <GetIcon onClick={
                            () => {
                            }}
                            className='p-1 mx-16 my-5 rounded-sm cursor-pointer'
                            iconName="Success" />
                        <div id="title" className="mb-3 text-2xl font-bold">{message} </div>
                        <div className="mb-3 text-lg font-bold">Please login to explore further.</div>
                        <Button variant='contained' onClick={() => { navigate('/login') }}>Login</Button>
                    </div>
                </Box>
            </Modal>
        </div>


    );
};

export default wrappedLayout(RegisterBusinessPage);

const styles = {
    btn: {
        width: '100%',
        color: '#FFFFFF',
        backgroundColor: '#825FFF',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        padding: '10px 40px 10px 40px',
        borderRadius: '10px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#5A3EBF',
        }
    },
}