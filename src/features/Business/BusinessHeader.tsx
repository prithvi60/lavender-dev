import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  Grid,
  Card,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

// Import custom icons
import AccountIcon from '../../assets/BusinessMenuPopup/Account icon.png';
import ChangePasswordIcon from '../../assets/BusinessMenuPopup/Group 37674.png';
import LogoutIcon from '../../assets/BusinessMenuPopup/Logout icon.png';
import PlanIcon from '../../assets/BusinessMenuPopup/Plan icon.png';
import EditIcon from '../../assets/BusinessMenuPopup/Edit icon.png';
import EditIconGray from '../../assets/BusinessMenuPopup/Edit icon (1).png';
import UserProfileIcon from '../../assets/BusinessMenuPopup/User Profile from Figma.png';
import PlusIcon from '../../assets/BusinessMenuPopup/plusicon.png';
import CautionIcon from '../../assets/BusinessMenuPopup/Group 37668.png';

// Assuming these are your custom components
import GetIcon from "../../assets/Icon/icon";
import Text from "../../components/Text";
import { getRoute } from "../../utils";
import endpoint from '../../api/endpoints';
import { useSnackbar } from '../../components/Snackbar';

// Styled components
const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 10,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      padding: '10px 15px',
      '& .MuiListItemIcon-root': {
        minWidth: 36,
      },
    },
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const CustomIcon = styled('img')({
  width: 20,
  height: 20,
});

const CustomListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontFamily: 'Urbanist',
    fontSize: '14px',
    fontWeight: 700,
    color: '#4D4D4D',
  },
});

const SlideInMenu = styled(Card)(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  right: open ? 0 : '-400px',
  width: '400px',
  height: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: theme.shadows[4],
  transition: 'right 0.3s ease-out',
  overflowY: 'auto',
  padding: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const Header = styled(Box)({
  backgroundColor: '#1C0E4C',
  color: '#FFFFFF',
  padding: '20px',
  fontSize: '20px',
  fontWeight: 'bold',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    '&:before, &:after': {
      borderBottom: 'none',
    },
  },
  '& .MuiInput-input': {
    padding: '10px',
    backgroundColor: '#F5F5F5',
  },
  [`& fieldset`]: {
    borderRadius: 9,
  },
});

const EditIconButton = styled(IconButton)({
  padding: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: '#D34D72',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#E04141',
  },
  width: '100%',
  padding: '10px',
  marginTop: '20px',
  borderRadius: '10px',
  fontSize: "20px",
  textTransform: 'none',
  fontWeight: '700',
});

const SaveButton = styled(Button)({
  backgroundColor: '#825FFF',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#4E2FB0',
  },
  width: '45%',
  padding: '10px',
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: "15px",
});

const CancelButton = styled(Button)({
  color: '#825FFF',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  width: '45%',
  padding: '10px',
  borderRadius: '5px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: "15px",
});

const CenteredAvatar = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  marginBottom: '24px',
});

const StyledDivider = styled(Divider)({
  marginTop: '20px',
  marginBottom: '20px',
  borderColor: '#BDBDBD',
  borderWidth: '1px',
});

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  mobileNumber: yup.string().required('Mobile number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dateOfBirth: yup.date().nullable().required('Date of birth is required'),
});

const BusinessHeader = ({ pageName, toggleSidebar }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const showSnackbar = useSnackbar();

  // Use Redux to get user data
  const userDetails = useSelector((state: RootState) => state.currentUserDetails);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userDetails) {
      reset({
        fullName: userDetails.fullName || '',
        email: userDetails.emailAddress || '',
        mobileNumber: userDetails.mobileNumber || '',
        dateOfBirth: userDetails.dob ? dayjs(userDetails.dob) : null,
      });
    }
  }, [reset, userDetails]);

  const handleLogOutBtn = () => {
    localStorage.clear();
    return navigate("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
    handleClose();
  };

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const response = await endpoint.updateProfile(payload);
      if (response?.data?.success) {
        showSnackbar('Profile updated successfully.', 'success');
        setIsEditProfileOpen(false);
        navigate(0);
      } else {
        showSnackbar(response?.data?.data, 'error');
      }
      return response;
    },
    onError: (error) => {
      showSnackbar('Update unsuccessful: ' + error.message, 'error');
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      "id": userDetails?.id,
      "fullName": data.fullName,
      "emailAddress": data.email,
      "mobileNumber": data.mobileNumber,
      "dob": data.dateOfBirth.toISOString(),
    };
    try {
      await mutation.mutateAsync(payload);
    } catch (error) {
      console.error('Mutation failed:', error);
    }
  };

  const menuItems = [
    { text: 'Account', icon: AccountIcon, onClick: handleEditProfile },
    { text: 'Change password', icon: ChangePasswordIcon, onClick: () => { /* Handle change password click */ } },
    { text: 'Log out', icon: LogoutIcon, onClick: handleLogOutBtn },
    { text: 'Plans', icon: PlanIcon, onClick: () => { /* Handle plans click */ } },
  ];

  return (
    <>
      <AppBar position="static" className="bg-white md:text-sm shadow-md w-full">
        <Toolbar className="gap-x-14 items-center px-2 md:px-4 py-2">
          <div className="flex flex-row items-center justify-between p-2 w-full">
            {pageName === "onboard" ? (
              <GetIcon
                className="cursor-pointer mr-8"
                href={() => getRoute("Login")}
                iconName="LavenderFullLogo"
              />
            ) : (
              <GetIcon
                className="cursor-pointer mr-8"
                href={() => getRoute("Login")}
                iconName="LavenderLogo"
              />
            )}
            {pageName !== "onboard" && (
              <Text
                align="left"
                className="cursor-pointer nav-bar-title flex"
                variant="h6"
                sx={{ flexGrow: 1 }}
                name={pageName || "Lavender"}
              />
            )}
            {isMobile ? (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
              >
                <GetIcon iconName="MenuIcon" />
              </IconButton>
            ) : (
              <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                <Button
                  onClick={handleLogOutBtn}
                  variant="outlined"
                  sx={{
                    width: "120px",
                    height: "37px",
                    fontFamily: "Urbanist",
                    borderRadius: "10px",
                    textTransform: "none",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  Logout
                </Button>
                <GetIcon iconName="NotificationBell" />
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <GetIcon iconName="BusinessProfile" />
                </IconButton>
                <StyledMenu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {menuItems.map((item, index) => (
                    <StyledMenuItem 
                      key={index} 
                      onClick={() => { item.onClick(); handleClose(); }}
                    >
                      <ListItemIcon>
                        <CustomIcon src={item.icon} alt={item.text} />
                      </ListItemIcon>
                      <CustomListItemText primary={item.text} />
                    </StyledMenuItem>
                  ))}
                </StyledMenu>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      
      <SlideInMenu open={isEditProfileOpen}>
        <Header>Edit profile</Header>
        <Box sx={{ p: 3 }}>
          <CenteredAvatar>
            <Avatar
              src={UserProfileIcon}
              className='shadow-md cursor-pointer'
              sx={{ width: 93, height: 99 }}
            />
            <Box
              component="img"
              className='cursor-pointer'
              src={EditIcon}   
              sx={{
                position: 'absolute',
                bottom: -25,
                right: '40%',
                transform: 'translateX(50%)',
                width: 50,
                height: 50,
              }}
            />
          </CenteredAvatar>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: '700' }}>Full name</Typography>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      InputProps={{
                        endAdornment: <EditIconButton><Box component="img" src={EditIconGray} sx={{ width: 26, height: 26 }} /></EditIconButton>,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: '700' }}>Mobile Number</Typography>
                <Controller
                  name="mobileNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber?.message}
                      InputProps={{
                        endAdornment: <EditIconButton><Box component="img" src={EditIconGray} sx={{ width: 26, height: 26 }} /></EditIconButton>,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: '700' }}>Date of Birth</Typography>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        slotProps={{
                          textField: (params) => ({
                            ...params,
                            fullWidth: true,
                            variant: "outlined",
                            error: !!errors.dateOfBirth,
                            helperText: errors.dateOfBirth?.message,
                            sx: {
                              '& .MuiInputBase-root': {
                                '&:before, &:after': {
                                  borderBottom: 'none',
                                },
                              },
                              '& .MuiInput-input': {
                                padding: '10px',
                                backgroundColor: '#F5F5F5',
                              },
                              [`& fieldset`]: {
                                borderRadius: 2,
                              },
                            },
                            InputProps: {
                              ...params.InputProps,
                              endAdornment: <EditIconButton><Box component="img" src={EditIconGray} sx={{ width: 26, height: 26 }} /></EditIconButton>,
                            },
                          }),
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: '700' }}>Email ID</Typography>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledTextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        endAdornment: <EditIconButton><Box component="img" src={EditIconGray} sx={{ width: 26, height: 26 }} /></EditIconButton>,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: '#5E3CD4', 
                    cursor: 'pointer', 
                    mt: 2,
                    '&:hover': { opacity: 0.8 }
                  }}
                  onClick={() => {/* Handle working hours click */}}
                >
                  <Typography sx={{ fontWeight: '700', width: "50%", color: '#4D4D4D' }}>My working hours</Typography>
                  <div className='w-1/2 flex justify-end'>
                    <Box component="img" src={PlusIcon} sx={{ width: 20, height: 20 }} />
                  </div>
                </Box>
              </Grid>
            </Grid>
            <StyledDivider />
            <DeleteButton>
              Delete my account
            </DeleteButton>
            <Box className="justify-center items-center" sx={{ display: 'flex', mt: 3, padding: "15px", borderRadius: "8px", bgcolor: "#E6E1FF" }}>
              <div className='w-1/3 flex justify-start'>
                <Box component="img" src={CautionIcon} sx={{ width: 25, height: 25 }} />
              </div>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#4D4D4D', textAlign: 'left', fontSize: '14px', fontWeight: '500' }}> 
                This will delete all your personal info and you won't be able to retrieve the account if deleted
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <CancelButton onClick={() => setIsEditProfileOpen(false)}>
                Cancel
              </CancelButton>
              <SaveButton type="submit">
                Save
              </SaveButton>
            </Box>
          </form>
        </Box>
      </SlideInMenu>
    </>
  );
};

export default BusinessHeader;