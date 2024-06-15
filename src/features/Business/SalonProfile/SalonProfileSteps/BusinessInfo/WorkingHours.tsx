import React, { useState } from 'react';
import { Card, Typography, Grid, Checkbox, Button } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import endpoints from '../../../../../api/endpoints';
import { useMutation } from '@tanstack/react-query';

export const WorkingHours = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [checkboxes, setCheckboxes] = useState(() => {
        const initialState = {};
        daysOfWeek.forEach(day => {
            initialState[day] = false;
        });
        return initialState;
    });

    const [inputFields, setInputFields] = useState(() => {
        const initialState = {};
        daysOfWeek.forEach(day => {
            initialState[day] = [{ opens: '', closes: '' }];
        });
        return initialState;
    });

    const handleCheckboxChange = (e, day) => {
        const isChecked = e.target.checked;
        setCheckboxes(prevState => ({
            ...prevState,
            [day]: isChecked
        }));
    };

    const handleInputChange = (newValue, day, index, field) => {
        setInputFields(prevState => ({
            ...prevState,
            [day]: prevState[day].map((item, idx) =>
                idx === index ? { ...item, [field]: newValue.format('HH:mm') } : item
            )
        }));
    };

    const handleAddField = (day) => {
        setInputFields(prevState => ({
            ...prevState,
            [day]: [...prevState[day], { opens: '', closes: '' }]
        }));
    };

    const handleDeleteField = (day, index) => {
        setInputFields(prevState => ({
            ...prevState,
            [day]: prevState[day].filter((_, idx) => idx !== index)
        }));
    };

    const handleSave = () => {
        const availableTimes = [];
        daysOfWeek.forEach(day => {
            if (checkboxes[day]) {
                const times = [];
                inputFields[day].forEach(field => {
                    times.push({
                        openTime: field.opens,
                        closeTime: field.closes
                    });
                });
                availableTimes.push({ day, timeSlots: times });
            }
        });
        alert(JSON.stringify({ availableTimes }));
        const payload = {
            "id": "EST00002500",
            "availableDays": availableTimes
        }
        mutation.mutate(payload)
    };

    const mutation = useMutation({
        mutationFn: (payload: any) => {
          return endpoints.saveEstablishmentWorkingHours(payload)
        },
        onSuccess: (resopnse: any) => {
          setTimeout(() => {
            
          })
        },
        onError: (response: any) => {
          
        },
        onSettled: () => {}
          
      })

    return (
        <div style={{ paddingTop: '20px' }}>
            <Card sx={{ alignContent: 'center', width: '100%', padding: '20px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D', textAlign: 'start' }}>WorkingHours</Typography>

                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {daysOfWeek.map((day, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card key={index} sx={{ alignContent: 'center', width: '100%', padding: '20px' }}>
                                <div className='flex'>
                                    <Checkbox
                                        checked={checkboxes[day]}
                                        onChange={(e) => handleCheckboxChange(e, day)}
                                    />
                                    <Typography sx={{ alignContent: 'center', fontSize: '18px', fontWeight: '700', color: '#808080', textAlign: 'start' }}>{day}</Typography>
                                </div>
                                {inputFields[day].map((field, i) => (
                                    <div key={i}>
                                        {checkboxes[day] && (
                                            <>
                                                <div className='flex'>
                                                    <div style={{ width: '50%', padding: '10px' }}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#4D4D4D', textAlign: 'start' }}>Opens at</Typography>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <TimePicker
                                                                label="from"
                                                                value={field.opens ? dayjs(field.opens, 'HH:mm') : null}
                                                                onChange={(newValue) => handleInputChange(newValue, day, i, 'opens')}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                    <div style={{ width: '50%', padding: '10px' }}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#4D4D4D', textAlign: 'start' }}>Closes at</Typography>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <TimePicker
                                                                label="to"
                                                                value={field.closes ? dayjs(field.closes, 'HH:mm') : null}
                                                                onChange={(newValue) => handleInputChange(newValue, day, i, 'closes')}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                </div>
                                                <Button onClick={() => handleAddField(day)}>Add</Button>
                                            </>
                                        )}
                                        {i > 0 && <button onClick={() => handleDeleteField(day, i)}>Delete</button>}
                                    </div>
                                ))}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button onClick={handleSave}>Save</Button>
            </Card>
        </div>
    );
};
