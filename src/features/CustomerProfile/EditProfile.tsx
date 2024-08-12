import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Modal from "@mui/material/Modal";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    TextField, Card, Grid, Typography,
    IconButton
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import endpoint from '../../api/endpoints';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../components/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ButtonRouter from '../../components/ButtonRouter';


const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    areaCode: yup.string().required('Area code is required'),
    mobileNumber: yup.string().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    dateOfBirth: yup.date().nullable(),
});

const typographyStyle = {
    fontFamily: 'Urbanist',
    fontWeight: 600,
    fontSize: '16px',
    color: '#4D4D4D'
};


function EditProfile({ userInfo }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(userInfo.appUser.dob));
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();

    // Populate form fields with initial data from userInfo on component mount
    useEffect(() => {
        if (userInfo?.appUser) {
            reset({
                fullName: userInfo?.appUser?.fullName || '',
                email: userInfo?.appUser?.emailAddress || '',
                areaCode: userInfo?.appUser?.mobileCountryCode || '',
                mobileNumber: userInfo?.appUser?.mobileNumber || '',
                dateOfBirth: userInfo?.appUser?.dob ? new Date(userInfo?.appUser?.dob) : null,
            });
        }
    }, [reset]);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const goBackToPreviousPage = () => {
        navigate(-1);
    };

    const mutation = useMutation({
        mutationFn: async (payload: any) => {
            const response = await endpoint.updateProfile(payload);
            if(response?.data?.success){
                showSnackbar('Items saved successfully.', 'success');
                setIsOpen(false)
                navigate(0)
              }
              else{
                showSnackbar(response?.data?.data, 'error');
            }
            return response;
        },
        onError: (error) => {
            alert('Edit unsuccessful: ' + error.message);
        },
    });

    const onSubmit = async (data) => {
        
        const payLoad = {
            "id": userInfo?.appUser?.id,
            "fullName": data.fullName,
            "emailAddress": data.email,
            "mobileCountryCode": data.areaCode,
            "mobileNumber": data.mobileNumber,
            "dob": data.dateOfBirth.toISOString(), // Convert date to ISO string
        };
        try {
            await mutation.mutateAsync(payLoad); // Wait for mutation to complete
        } catch (error) {
            console.error('Mutation failed:', error);
        }
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Adjust width as needed
        maxWidth: 700, // Maximum width for responsiveness
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 8, 
        p: 4,
    };

    return (
        <>
            <Button sx={{borderRadius: '10px', padding: '10px 40px 10px 40px', fontWeight:'600', fontSize: '20px'}} variant={"outlined"} name={"Edit Profile"} onClick={handleClick}></Button>
            <Modal
                open={isOpen}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={modalStyle}>
                    <div className='absolute top-4 right-4'>
                        <IconButton  onClick={() => handleClick()}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <form onSubmit={ handleSubmit((data)=>{
                            onSubmit(data);
                        })}>
                        <Grid container spacing={2}>
                        
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" sx={{ fontFamily: 'Urbanist', fontSize: '28px', fontWeight: '600', color: '#616161', marginBottom: '8px' }}>Edit Information</Typography>
                            </Grid>
                            
                            <Grid container item xs={12} spacing={2} sx={{ my: "4px" }}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Full Name</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="standard"
                                                error={!!errors.fullName}
                                                helperText={errors.fullName?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2} sx={{ my: "4px" }}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Email</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="standard"
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2} sx={{my: "4px"}}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Area code</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="areaCode"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="standard"
                                                error={!!errors.areaCode}
                                                helperText={errors.areaCode?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2} sx={{my: "4px"}}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Mobile number</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="mobileNumber"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                fullWidth
                                                {...field}
                                                variant="standard"
                                                error={!!errors.mobileNumber}
                                                helperText={errors.mobileNumber?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} spacing={2} sx={{my: "4px"}}>
                                <Grid item xs={4}>
                                    <Typography sx={typographyStyle}>Date of birth</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Controller
                                        name="dateOfBirth"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field }) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    {...field}
                                                    value={value}
                                                    // renderInput={(params: any) => (
                                                    //     <TextField
                                                    //         {...params}
                                                    //         fullWidth
                                                    //         variant="standard"
                                                    //         error={!!errors.dateOfBirth}
                                                    //         helperText={errors.dateOfBirth?.message}
                                                    //     />
                                                    // )}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <div style={{textAlign: 'center', width: '100%'}}>
                                    <Button type="submit" sx={styles.btn} name={"Save changes" } disableRipple={true}></Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>

                </Card>
            </Modal>
        </>
    );
}

export default EditProfile;

const styles = {
    btn: {
      color: '#FFFFFF',
      backgroundColor: '#825FFF',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '24px',
      padding: '10px 40px 10px 40px',
      borderRadius: '10px',
      textTransform: 'none',
      whiteSpace: 'nowrap',
      '&:hover': {
        backgroundColor: '#5A3EBF',
      },
    },
}