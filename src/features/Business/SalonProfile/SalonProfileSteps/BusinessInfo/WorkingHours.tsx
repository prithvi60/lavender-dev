import React, { useState, useEffect } from 'react';
import { Card, Typography, Grid, Checkbox, Button, IconButton, Snackbar } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import endpoints from '../../../../../api/endpoints';
import { useMutation } from '@tanstack/react-query';
import GetIcon from '../../../../../assets/Icon/icon';

export const WorkingHours = ({ userDetails, availableDays }) => {
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
            initialState[day] = [{ opens: null, closes: null }];
        });
        return initialState;
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (availableDays && availableDays.length > 0) {
            const updatedFields = {};
            const updatedCheckboxes = {};
            daysOfWeek.forEach(day => {
                const matchingDay = availableDays.find(d => d.day === day);
                if (matchingDay) {
                    updatedFields[day] = matchingDay.timeSlots.map(slot => ({
                        opens: slot.openTime,
                        closes: slot.closeTime
                    }));
                    updatedCheckboxes[day] = true;
                } else {
                    updatedFields[day] = [{ opens: null, closes: null }];
                    updatedCheckboxes[day] = false;
                }
            });
            setInputFields(updatedFields);
            setCheckboxes(updatedCheckboxes);
        }
    }, [availableDays]);

    const handleCheckboxChange = (e, day) => {
        const isChecked = e.target.checked;
        setCheckboxes(prevState => ({
            ...prevState,
            [day]: isChecked
        }));
        if (!isChecked) {
            setInputFields(prevState => ({
                ...prevState,
                [day]: [{ opens: null, closes: null }]
            }));
        }
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
            [day]: [...prevState[day], { opens: null, closes: null }]
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
                    if (field.opens && field.closes) {
                        times.push({
                            openTime: field.opens,
                            closeTime: field.closes
                        });
                    }
                });
                availableTimes.push({ day, timeSlots: times });
            }
        });
        const payload = {
            id: userDetails ? userDetails.establishmentId : '',
            availableDays: availableTimes
        };
        mutation.mutate(payload);
    };

    const mutation = useMutation({
        mutationFn: (payload: any) => endpoints.saveEstablishmentWorkingHours(payload),
        onSuccess: (response) => {
            setSnackbarMessage('Items saved successfully.');
            setSnackbarOpen(true);
        },
        onError: (error) => {
            // handle error actions if needed
        },
        onSettled: () => {
            // handle settled actions if needed
        },
    });

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ paddingTop: '20px' }}>
            <Card sx={{ alignContent: 'center', width: '100%', padding: '20px' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#4D4D4D', textAlign: 'start' }}>Working Hours</Typography>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {daysOfWeek.map((day, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ alignContent: 'center', width: '100%', padding: '20px', marginBottom: '20px' }}>
                                <div className='flex' style={{ alignItems: 'center' }}>
                                    <Checkbox
                                        checked={checkboxes[day]}
                                        onChange={(e) => handleCheckboxChange(e, day)}
                                    />
                                    <Typography sx={{ fontSize: '18px', fontWeight: '700', color: '#808080', textAlign: 'start', marginLeft: '10px' }}>{day}</Typography>
                                </div>
                                {inputFields[day].map((field, i) => (
                                    <div key={i} style={{ marginBottom: '10px' }}>
                                        {checkboxes[day] && (
                                            <div className='flex' style={{ marginBottom: '10px' }}>
                                                <div style={{ width: '50%', paddingRight: '10px' }}>
                                                    <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#4D4D4D', textAlign: 'start' }}>Opens at</Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            label="from"
                                                            value={field.opens ? dayjs(field.opens, 'HH:mm') : null}
                                                            onChange={(newValue) => handleInputChange(newValue, day, i, 'opens')}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <div style={{ width: '50%', paddingLeft: '10px' }}>
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
                                        )}
                                        {i > 0 && (
                                            <IconButton size="small" onClick={() => handleDeleteField(day, i)}>
                                                <GetIcon iconName="CloseIcon" />
                                            </IconButton>
                                        )}
                                    </div>
                                ))}
                                {checkboxes[day] && (
                                    <IconButton size="small" onClick={() => handleAddField(day)}>
                                        <GetIcon iconName="PlusIcon" />
                                    </IconButton>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>Save</Button>
            </Card>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                        <GetIcon iconName="CloseIcon" />
                    </IconButton>
                }
            />
        </div>
    );
};
