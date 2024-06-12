import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Buttons from '../../../../../components/Button'
import { WorkingHours } from './WorkingHours';
import { ServicesInfo } from './ServicesInfo';

const schema = yup.object().shape({
    salonName: yup.string().required(),
    extension: yup.number().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string().required(),
    doorNo: yup.string().required(),
    zipCode: yup.number().required(),
  });

export const BusinessInfo = () => {
    const {register, handleSubmit, watch, formState: {errors}}: any = useForm({
        resolver: yupResolver(schema)
      });

  return (
    <div className='w-full'>
        <div className='text-5xl font-bold text-center p-4' style={{color: '#4D4D4D'}}>Modify your business info</div>
        <div className='text-xl font-normal text-center p-4' style={{color: '#4D4D4D'}}>We will show these details to clients online</div>
        <Grid container spacing={2} sx={{paddingTop: '20px'}}>
            <Grid xs={7}>
                <form
                onSubmit={handleSubmit((data: any) => {
                    alert(JSON.stringify(data));
                })}
                >
                    <div className='w-full h-full flex justify-center'>
                        <Card sx={{ alignContent: 'center', width: '80%'}}>
                            <CardContent>
                                <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Salon name</Typography>
                                <TextField fullWidth size='small' id="outlined-basic" variant="outlined" {...register("salonName")} />
                                {errors.salonName && <p className='text-red-500 font-medium'>{errors.salonName.message}</p>}
                            </CardContent>
                            <CardContent>
                                <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Extension</Typography>
                                <TextField sx={{width: '15%'}} size='small' id="outlined-basic" variant="outlined" {...register("extension")} />
                                <TextField sx={{width: '85%'}} size='small' id="outlined-basic" variant="outlined" {...register("extension")} />
                                {errors.email && <p className='text-red-500 font-medium'>{errors.extension.message}</p>}
                            </CardContent>
                            <CardContent>
                                <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Email ID</Typography>
                                <TextField fullWidth size='small' id="outlined-basic" variant="outlined" {...register("email")} />
                                {errors.email && <p className='text-red-500 font-medium'>{errors.email.message}</p>}
                            </CardContent>
                            <CardContent>
                                <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Address</Typography>
                                <TextField fullWidth size='small' id="outlined-basic" variant="outlined" {...register("address")} />
                                {errors.address && <p className='text-red-500 font-medium'>{errors.address.message}</p>}
                            </CardContent>
                            <CardContent>
                                <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>City</Typography>
                                <TextField fullWidth size='small' id="outlined-basic"  variant="outlined" {...register("city")} />
                                {errors.city && <p className='text-red-500 font-medium'>{errors.city.message}</p>}
                            </CardContent>
                            <div className='flex'>
                            <CardContent>
                                    <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Door/Apt. no.</Typography>
                                    <TextField fullWidth  size='small' id="outlined-basic"  variant="outlined" {...register("doorNo")} />
                                    {errors.doorNo && <p className='text-red-500 font-medium'>{errors.doorNo.message}</p>}
                            </CardContent>
                            <CardContent>
                            
                                    <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#4D4D4D'}}>Zip code</Typography>
                                    <TextField fullWidth  size='small' id="outlined-basic"  variant="outlined" {...register("zipCode")} />
                                    {errors.zipCode && <p className='text-red-500 font-medium'>{errors.zipCode.message}</p>}
                            </CardContent>
                            </div>
                            <CardContent>
                                <Buttons fullWidth type="submit" variant="contained" sx={{fontSize: '14px'}} name={'Save'}></Buttons>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Grid>
            <Grid xs={5}>
                <TextField sx={{width: '90%', paddingBottom: '20px'}} type='search' size='small' id="outlined-basic" label='Search for location' variant="outlined" {...register("doorNo")} />
                <Card sx={{ alignContent: 'center', width: '90%'}}>
                    <div className='iframe-container'>
                        {<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31081.53269316962!2d80.20855351621644!3d13.15031202030962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264db59c3d4b5%3A0x9be03109019f05f!2sMadhavaram%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716260701299!5m2!1sen!2sin" width="600" height="450" loading="lazy"></iframe>}
                    </div>
                </Card>
                <Typography sx={{fontSize: '20px', fontWeight: '400', color: '#4D4D4D', textAlign: 'center', width: '90%'}}>Drag the location pin to set the location</Typography>
            </Grid>
        </Grid>
        <WorkingHours />
        <ServicesInfo />
    </div>
  )
}
