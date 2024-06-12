import React, { useState } from 'react';
import { Card, Typography, TextField, Grid } from '@mui/material'; // Assuming you're using Material-UI
import GetIcon from '../../../../../assets/Icon/icon';

export const WorkingHours = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // State to manage input fields for each day
    const [inputFields, setInputFields] = useState(() => {
        const initialState = {};
        daysOfWeek.forEach(day => {
            initialState[day] = [{ opens: '', closes: '' }];
        });
        return initialState;
    });

    // Function to handle input changes for a specific day
    const handleInputChange = (e, day, index, field) => {
        const updatedFields = { ...inputFields };
        updatedFields[day][index][field] = e.target.value;
        setInputFields(updatedFields);
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
                                <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#4D4D4D', textAlign: 'start' }}>{day}</Typography>
                                {inputFields[day].map((field, i) => (
                                    <div key={i}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#4D4D4D', textAlign: 'start' }}>Opens at</Typography>
                                        <TextField fullWidth size='small' id={`${day}-opens-${i}`} variant="outlined" value={field.opens} onChange={(e) => handleInputChange(e, day, i, 'opens')} />

                                        <Typography sx={{ fontSize: '14px', fontWeight: '400', color: '#4D4D4D', textAlign: 'start' }}>Closes at</Typography>
                                        <TextField fullWidth size='small' id={`${day}-closes-${i}`} variant="outlined" value={field.closes} onChange={(e) => handleInputChange(e, day, i, 'closes')} />

                                        {i > 0 && <button onClick={() => handleDeleteField(day, i)}>Delete</button>}
                                    </div>

                                ))}
                                <GetIcon iconName='PlusIcon' onClick={() => handleAddField(day)} />
                            </Card>
                        </Grid>

                    ))}
                </Grid>

            </Card>
        </div>

    );
}
