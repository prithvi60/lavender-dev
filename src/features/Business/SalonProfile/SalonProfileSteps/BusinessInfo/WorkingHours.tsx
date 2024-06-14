import React, { useState } from 'react';
import { Card, Typography, TextField, Grid, Checkbox } from '@mui/material'; // Assuming you're using Material-UI
import GetIcon from '../../../../../assets/Icon/icon';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const WorkingHours = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    // State to manage input fields for each day
    const [inputFields, setInputFields] = useState(() => {
        const initialState = {};
        daysOfWeek.forEach(day => {
            initialState[day] = [{ opens: '', closes: '' }];
        });
        return initialState;
    });

    // State to manage checkbox status for each day
    const [checkboxes, setCheckboxes] = useState(() => {
        const initialState = {};
        daysOfWeek.forEach(day => {
            initialState[day] = false;
        });
        return initialState;
    });

    // Function to handle input changes for a specific day
    const handleInputChange = (e, day, index, field) => {
        const updatedFields = { ...inputFields };
        updatedFields[day][index][field] = e.target.value;
        setInputFields(updatedFields);
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (e, day) => {
        const isChecked = e.target.checked;
        setCheckboxes(prevState => ({
            ...prevState,
            [day]: isChecked
        }));
    };

    // Function to add a new input field for a specific day
    const handleAddField = (day) => {
        setInputFields(prevState => {
            const updatedFields = { ...prevState };
            updatedFields[day] = [...updatedFields[day], { opens: '', closes: '' }];
            return updatedFields;
        });
    };

    // Function to delete an input field for a specific day
    const handleDeleteField = (day, index) => {
        setInputFields(prevState => {
            const updatedFields = { ...prevState };
            updatedFields[day] = updatedFields[day].filter((_, i) => i !== index);
            return updatedFields;
        });
    };

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
                                                    <div style={{width: '50%', padding: '10px'}}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#4D4D4D', textAlign: 'start' }}>Opens at</Typography>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <TimePicker
                                                            label="from"
                                                            value={value}
                                                            onChange={(newValue) => setValue(newValue)}
                                                            />
                                                        </LocalizationProvider>
                                                        {/* <TimePicker
                                                        views={['hours']}
                                                        sx={{
                                                            minWidth: 100,
                                                            maxWidth: 150
                                                        }} label="from"
                                                            value={dayjs(SelectedTime.from)}
                                                            onAccept={onChangeFromTime}
                                                        /> */}

                                                        {/* <TimePicker
                                                        label="from"
                                                        value={value}
                                                        onChange={(newValue) => setValue(newValue)}
                                                        /> */}
                                                        {/* <TextField size='small' id={`${day}-opens-${i}`} variant="outlined" value={field.opens} onChange={(e) => handleInputChange(e, day, i, 'opens')} /> */}
                                                    </div>
                                                    <div style={{width: '50%', padding: '10px'}}>
                                                        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#4D4D4D', textAlign: 'start' }}>Closes at</Typography>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <TimePicker
                                                            label="to"
                                                            value={value}
                                                            onChange={(newValue) => setValue(newValue)}
                                                            />
                                                        </LocalizationProvider>
                                                        
                                                        {/* <TimePicker
                                                        views={['hours']}
                                                        sx={{
                                                            minWidth: 100,
                                                            maxWidth: 150,
                                                            marginLeft: 3
                                                        }} label="To"
                                                        // value={dayjs('2022-04-17T15:30')}

                                                            value={dayjs(SelectedTime.to)}
                                                            // defaultValue={dayjs(SelectedTime.to, 'hh a')}
                                                            onAccept={onChangeToTime}
                                                        /> */}
                                                        {/* <TextField size='small' id={`${day}-closes-${i}`} variant="outlined" value={field.closes} onChange={(e) => handleInputChange(e, day, i, 'closes')} /> */}
                                                    </div>
                                                </div>
                                                
                                                <GetIcon iconName='PlusIcon' onClick={() => handleAddField(day)} />
                                                
                                            </>
                                        )}
                                        {i > 0 && <button onClick={() => handleDeleteField(day, i)}>Delete</button>}
                                    </div>

                                ))}
                            </Card>
                        </Grid>

                    ))}
                </Grid>

            </Card>
        </div>

    );
}
