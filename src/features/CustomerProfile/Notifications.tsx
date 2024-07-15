import React, { useState } from 'react';
import { Card, FormControlLabel, FormGroup, Switch, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import endpoint from '../../api/endpoints'; // Import your API endpoint function
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from '../../components/Snackbar';
import { useNavigate } from 'react-router-dom';

function Notifications({ userInfo }) {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      notificationSMS: userInfo?.appUser?.customerSettings?.notificationSMS || false,
      notificationEmail: userInfo?.appUser?.customerSettings?.notificationEmail || false,
      notificationPush: userInfo?.appUser?.customerSettings?.notificationPush || false,
      promotionsMail: userInfo?.appUser?.customerSettings?.promotionsMail || false,
      promotionsSMS: userInfo?.appUser?.customerSettings?.promotionsSMS || false,
    },
  });

  const [formChanged, setFormChanged] = useState(false);

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await endpoint.updateProfile(payload);
      if(response?.data?.success){
        showSnackbar('Items saved successfully.', 'success');
       // navigate(0)
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
      id: userInfo?.appUser?.id,
      fullName: userInfo?.appUser?.fullName,
      emailAddress: userInfo?.appUser?.emailAddress,
      mobileCountryCode: userInfo?.appUser?.mobileCountryCode,
      mobileNumber: userInfo?.appUser?.mobileNumber,
      dob: userInfo?.appUser?.dob,
      customerSettings: {
        notificationSMS: data.notificationSMS,
        notificationEmail: data.notificationEmail,
        notificationPush: data.notificationPush,
        promotionsMail: data.promotionsMail,
        promotionsSMS: data.promotionsSMS,
      },
    };
    try {
      const response = await mutation.mutateAsync(payLoad); // Wait for mutation to complete
      if (response?.data?.success) {
        setFormChanged(false); // Reset form changed state after successful submission
      } else {
        console.log("error")
      }
    } catch (error) {
      console.error('Mutation failed:', error);
    }
  };

  const handleChange = () => {
    // Check if any field has changed
    setFormChanged(true);
  };

  return (
    <div className='mt-10'>
      <div className='text-3xl font-bold py-4'>Notification Preferences</div>
      <Card sx={{ boxShadow: '0 1px 6px rgba(0,0,0,0.15)', borderRadius: '20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='p-5 lg:p-8 flex flex-col lg:flex-row'>
            <div className='w-full lg:w-5/12 flex flex-col gap-4'>
              <div className='text-xl font-bold'>Appointment reminders</div>
              <div className='text-xl' style={{ color: '#808080' }}>
                We will notify about your appointments on time
              </div>
              <FormGroup>
                <Controller
                  name='notificationSMS'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      className='justify-between !m-0'
                      control={<Switch className='toggle-ui' color='success' {...field} checked={field.value} onChange={(e) => { field.onChange(e); handleChange(); }} />}
                      label='Notifications via SMS'
                      labelPlacement='start'
                    />
                  )}
                />
                <Controller
                  name='notificationEmail'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      className='justify-between !m-0'
                      control={<Switch className='toggle-ui' color='success' {...field} checked={field.value} onChange={(e) => { field.onChange(e); handleChange(); }} />}
                      label='Notifications via Mail'
                      labelPlacement='start'
                    />
                  )}
                />
                <Controller
                  name='notificationPush'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      className='justify-between !m-0'
                      control={<Switch className='toggle-ui' color='success' {...field} checked={field.value} onChange={(e) => { field.onChange(e); handleChange(); }} />}
                      label='Notifications via Push'
                      labelPlacement='start'
                    />
                  )}
                />
              </FormGroup>
            </div>
            <div className='w-full lg:w-2/12 flex py-3 lg:py-0 justify-center'>
              <div className='bg-zinc-300 h-px w-full lg:w-px lg:h-full'></div>
            </div>
            <div className='w-full lg:w-5/12 flex flex-col gap-4'>
              <div className='text-xl font-bold'>Lavender promotions</div>
              <div className='text-xl' style={{ color: '#808080' }}>
                We send you marketing offers and news that you might find interesting
              </div>
              <FormGroup>
                <Controller
                  name='promotionsMail'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      className='justify-between !m-0'
                      control={<Switch className='toggle-ui' color='success' {...field} checked={field.value} onChange={(e) => { field.onChange(e); handleChange(); }} />}
                      label='Communications through Mail'
                      labelPlacement='start'
                    />
                  )}
                />
                <Controller
                  name='promotionsSMS'
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      className='justify-between !m-0'
                      control={<Switch className='toggle-ui' color='success' {...field} checked={field.value} onChange={(e) => { field.onChange(e); handleChange(); }} />}
                      label='Communications through SMS'
                      labelPlacement='start'
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>
          {formChanged && (
            <div className='flex justify-end pr-6 pb-6'>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}

export default Notifications;
