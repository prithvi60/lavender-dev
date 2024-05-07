import React, { useState } from 'react'
import Button from '../../components/Button'
import Modal from "@mui/material/Modal";
import Password from '../../features/Login/Password';
import CheckBox from '../../components/Checkbox';
import { Grid, Box, Card } from '@mui/material';
import Dropdown from '../../components/Dropdown';
import Text from '../../components/Text';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField'

function EditProfile() {
    const [isOpen, setIsOpen] = useState(false);
    // const { addUser } = useSelector((state: any) => state.userAdmin);

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

    // const dispatch = useDispatch();

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
        if (true) {
            // dispatch(setAddUser({addUser: false}));
            goBackToPreviousPage();
        } else {
            // dispatch(isNewAccount({ newAccount: false }));
            // dispatch(setAccountCreated({ accountCreated: true }));
        }
    }
    function handleClick(){
        setIsOpen((prev)=> !prev)
    }

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
      
  return (
    <>
        <Button variant={"outlined"} name={"Edit Profile"} onClick={handleClick}></Button>
        <Modal
        open={isOpen}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Card sx={style}>
            <Grid item xs={12}>
                <Text variant="h4" align="center" name="Edit Information" />
            </Grid>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Text name="Full Name"/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            autoComplete="given-name"
                            name="fullName"
                            required
                            fullWidth
                            id="fullName"
                            
                            autoFocus
                            onChange={handleOnChange}
                            value={data?.fullName}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Text name="Email Address"/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            onChange={handleOnChange}
                            value={data?.email}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Text name="Mobile number"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            required
                            variant="standard"
                            fullWidth
                            id="mobileNumber"
                            onChange={handleOnChange}
                            value={data?.mobileNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            variant="standard"
                            fullWidth
                            id="mobileNumber"
                            onChange={handleOnChange}
                            value={data?.mobileNumber}
                        />
                    </Grid>
                                
                    <Grid item xs={12} sm={4}>
                        <Text name="Date"
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField
                            type="number"
                            InputProps={{ inputProps: { min: 1, max: 31 } }}
                            value={data?.birthDate}
                            id={"birthDate"}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Dropdown
                            value={data?.birthMonth}
                            onChange={(e) => handleOnChange('birthMonth', e.target?.value)}
                            options={MONTHS?.map((month) => {
                                const monthStr = new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });
                                return {
                                    value: month, label: monthStr
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Dropdown
                            value={data?.birthYear}
                            onChange={(e) => handleOnChange('birthYear', e.target?.value)}
                            options={YEARS?.map((year) => {
                                return {
                                    value: year, label: year
                                }
                            })}
                        />
                    </Grid>
                       
                    <Grid item xs={12} sm={4}>
                        <Text name="Gender"
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    <Dropdown
                            value={data?.gender}
                            onChange={handleGenderChange}
                            options={[{value: 'male', label: 'Male'},
                                {value: 'female', label: 'Female'},
                                {value: 'other', label: 'Other'},
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            
                            variant="contained"
                            fullWidth
                            className='contained'
                            name={"Save changes"}
                            onClick={handleClickCreate}
                        />
                    </Grid>
                </Grid>
            </Box>
        </ Card>
        </Modal>
    </>
  )
}

export default EditProfile