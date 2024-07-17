import { Button, Card, CardContent, Grid, TextField, Typography, Snackbar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import endpoints from '../../../../../api/endpoints';
import { BusinessInfoSchema } from './BusinessInfoSchema';
import { WorkingHours } from './WorkingHours';
import GetIcon from '../../../../../assets/Icon/icon';
import { useSnackbar } from '../../../../../components/Snackbar';

interface IBasicInfo {
  establishmentName: string;
  establishmentAbout: string;
  phoneExtension: string;
  phoneNumber: number;
  doorNo: string;
  zipCode: number;
  areaCode: string;
  cityCode: string;
  stateCode: string;
  locationTitle: string;
  geoX: string;
  geoY: string;
}

export const BusinessInfo = ({ userDetails, basicInfo, availableDays }: { userDetails: any; basicInfo: IBasicInfo | null; availableDays: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm({
    resolver: yupResolver(BusinessInfoSchema),
    defaultValues: {
      establishmentName: '',
      establishmentAbout: '',
      phoneExtension: '',
      phoneNumber: '',
      doorNo: '',
      zipCode: '',
      areaCode: '',
      cityCode: '',
      stateCode: '',
      locationTitle: '',
      geoX: '',
      geoY: '',
      ...basicInfo, // Populate with basicInfo if available
    },
  });

  //const navigate = useNavigate();
  const showSnackbar = useSnackbar();
    
  // Set form values if basicInfo is available
  React.useEffect(() => {
    if (basicInfo) {
      setValue('establishmentName', basicInfo.establishmentName);
      setValue('establishmentAbout', basicInfo.establishmentAbout);
      setValue('phoneExtension', basicInfo.phoneExtension);
      setValue('phoneNumber', basicInfo.phoneNumber);
      setValue('doorNo', basicInfo.doorNo);
      setValue('zipCode', basicInfo.zipCode);
      setValue('areaCode', basicInfo.areaCode);
      setValue('cityCode', basicInfo.cityCode);
      //setValue('stateCode', basicInfo.stateCode);
      // setValue('locationTitle', basicInfo.locationTitle);
      // setValue('geoX', basicInfo.geoX);
      // setValue('geoY', basicInfo.geoY);
    }
  }, [basicInfo, setValue]);

  const handleSaveButton = (data) => {
    const payload = {
      id: userDetails ? userDetails.establishmentId : '',
      profile: {
        establishmentName: data.establishmentName,
        establishmentAbout: data.establishmentAbout,
        phoneExtension: data.phoneExtension,
        phoneNumber: data.phoneNumber,
        areaCode: data.areaCode,
        doorNo: data.doorNo,
        zipCode: data.zipCode,
        cityCode: data.cityCode,
        stateCode: data.stateCode,
        locationTitle: data.locationTitle,
        geoX: data.geoX,
        geoY: data.geoY,
      },
    };
    mutation.mutate(payload);
  };

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return endpoints.saveEstablishmentProfile(payload);
    },
    onSuccess: (response) => {
      if(response?.data?.success){
        showSnackbar('Items saved successfully.', 'success');
      }
      else{
        showSnackbar(response?.data?.data, 'error');
      }
    },
    onError: (error) => {
      // handle error actions if needed
    },
    onSettled: () => {
      // handle settled actions if needed
    },
  });

  return (
    <div className="w-full">
      <div className="text-5xl font-bold text-center p-4" style={{ color: '#4D4D4D' }}>
        Modify your business info
      </div>
      <div className="text-xl font-normal text-center p-4" style={{ color: '#4D4D4D' }}>
        We will show these details to clients online
      </div>
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
        <form
          onSubmit={handleSubmit((data) => {
            handleSaveButton(data);
          })}
          style={{ width: '100%' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    Salon name
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('establishmentName')} />
                  {errors.establishmentName && (
                    <p className="text-red-500 font-medium">{errors.establishmentName.message}</p>
                  )}
                </CardContent>
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    About
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('establishmentAbout')} />
                  {errors.establishmentAbout && (
                    <p className="text-red-500 font-medium">{errors.establishmentAbout.message}</p>
                  )}
                </CardContent>

                <CardContent>
                  <Grid container spacing={2}>
                    {/* Extension label and TextField */}
                    <Grid item xs={4}>
                      <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                        Extension
                      </Typography>
                      <TextField inputProps={{ maxLength: 3 }} size="small" variant="outlined" {...register('phoneExtension')} />
                    </Grid>

                    {/* Phone label and TextField */}
                    <Grid item xs={8}>
                      <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                        Phone
                      </Typography>
                      <TextField inputProps={{ maxLength: 10 }} size="small" fullWidth variant="outlined" {...register('phoneNumber')} />
                    </Grid>
                  </Grid>
                  {errors.phoneNumber && (
                    <p className="text-red-500 font-medium">{errors.phoneNumber.message}</p>
                  )}
                </CardContent>



                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    Email ID
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('email')} />
                  {errors.email && <p className="text-red-500 font-medium">{errors.email.message}</p>}
                </CardContent>
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    Address
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('address')} />
                  {errors.address && <p className="text-red-500 font-medium">{errors.address.message}</p>}
                </CardContent>
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    City
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('cityCode')} />
                  {errors.cityCode && <p className="text-red-500 font-medium">{errors.cityCode.message}</p>}
                </CardContent>
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    Door/Apt. no.
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('doorNo')} />
                  {errors.doorNo && <p className="text-red-500 font-medium">{errors.doorNo.message}</p>}
                </CardContent>
                <CardContent>
                  <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D' }}>
                    Zip code
                  </Typography>
                  <TextField fullWidth size="small" variant="outlined" {...register('zipCode')} />
                  {errors.zipCode && <p className="text-red-500 font-medium">{errors.zipCode.message}</p>}
                </CardContent>
                <CardContent>
                  {isDirty && (
                    <Button fullWidth type="submit" variant="contained" sx={{ fontSize: '14px' }}>
                    Save
                  </Button>
                  )}
                  
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                sx={{ width: '100%', paddingBottom: '20px', color: '#B3B3B3' }}
                type="search"
                size="small"
                label="Search for location"
                variant="outlined"
              />
              <Card sx={{ width: '100%' }}>
                <div className="iframe-container">
                  {
                    // Adjusted iframe size for responsiveness
                  }
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31081.53269316962!2d80.20855351621644!3d13.15031202030962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264db59c3d4b5%3A0x9be03109019f05f!2sMadhavaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716260701299!5m2!1sen!2sin"
                    width="100%"
                    height="300" // Adjusted height for responsiveness
                    loading="lazy"
                  ></iframe>
                </div>
              </Card>
              <Typography
                variant="body1"
                sx={{ fontSize: '20px', fontWeight: '400', color: '#4D4D4D', textAlign: 'center', marginTop: '20px' }}
              >
                Drag the location pin to set the location
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <WorkingHours userDetails={userDetails} availableDays={availableDays}/>
          </Grid>
        </form>
      </Grid>

    </div>
  );
};
