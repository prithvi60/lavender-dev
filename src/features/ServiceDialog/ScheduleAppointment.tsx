import * as React from 'react';
import { Button, Chip, Divider, Grid, Select, MenuItem as BaseMenuItem, menuItemClasses } from '@mui/material';
import DatePicker from '../../Packages/swiperCalendar/DatePicker.tsx';
import GetIcon from '../../assets/Icon/icon';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints.ts';
import { UpdateSelectedDate, UpdateTimeOfDayAndTime } from '../../store/slices/Booking/ScheduleAppoinmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TimeOfDay } from '../../api/type';

// Sample data structure from the API response
const sampleData = [
    {
        "availableDate": "24-06-27",
        "availableSlots": {
            "Morning": [
                {
                    "employeeId": "string",
                    "startTime": "10:09 AM",
                    "endTime": "11:09 AM"
                },
                {
                    "employeeId": "string",
                    "startTime": "10:39 AM",
                    "endTime": "11:39 AM"
                },
                {
                    "employeeId": "string",
                    "startTime": "11:09 AM",
                    "endTime": "12:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "11:39 AM",
                    "endTime": "12:39 PM"
                }
            ],
            "Afternoon": [
                {
                    "employeeId": "string",
                    "startTime": "12:09 PM",
                    "endTime": "1:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "12:39 PM",
                    "endTime": "1:39 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "1:09 PM",
                    "endTime": "2:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "1:39 PM",
                    "endTime": "2:39 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "2:09 PM",
                    "endTime": "3:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "2:39 PM",
                    "endTime": "3:39 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "3:09 PM",
                    "endTime": "4:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "3:39 PM",
                    "endTime": "4:39 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "4:09 PM",
                    "endTime": "5:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "4:39 PM",
                    "endTime": "5:39 PM"
                }
            ],
            "Evening": [
                {
                    "employeeId": "string",
                    "startTime": "5:09 PM",
                    "endTime": "6:09 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "5:39 PM",
                    "endTime": "6:39 PM"
                }
            ]
        }
    },
    {
        "availableDate": "24-06-28",
        "availableSlots": {
            "Morning": [
                {
                    "employeeId": "string",
                    "startTime": "10:00 AM",
                    "endTime": "11:00 AM"
                },
                {
                    "employeeId": "string",
                    "startTime": "10:30 AM",
                    "endTime": "11:30 AM"
                },
                {
                    "employeeId": "string",
                    "startTime": "11:00 AM",
                    "endTime": "12:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "11:30 AM",
                    "endTime": "12:30 PM"
                }
            ],
            "Afternoon": [
                {
                    "employeeId": "string",
                    "startTime": "12:00 PM",
                    "endTime": "1:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "12:30 PM",
                    "endTime": "1:30 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "1:00 PM",
                    "endTime": "2:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "1:30 PM",
                    "endTime": "2:30 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "2:00 PM",
                    "endTime": "3:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "2:30 PM",
                    "endTime": "3:30 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "3:00 PM",
                    "endTime": "4:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "3:30 PM",
                    "endTime": "4:30 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "4:00 PM",
                    "endTime": "5:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "4:30 PM",
                    "endTime": "5:30 PM"
                }
            ],
            "Evening": [
                {
                    "employeeId": "string",
                    "startTime": "5:00 PM",
                    "endTime": "6:00 PM"
                },
                {
                    "employeeId": "string",
                    "startTime": "5:30 PM",
                    "endTime": "6:30 PM"
                }
            ]
        }
    }
];

export default function ScheduleAppointment(props) {
    const { estData, onSetActiveStep } = props;
    const [availableTimeSlots, setAvailableTimeSlots] = React.useState([]);
    const dispatch = useDispatch();
    const { selectedDate, timeOfDay, startTime, endTime, id } = useSelector((state) => state.ScheduleAppoinment);

    const { isLoading, data: appointmentTimings } = useQuery({
        queryKey: ['query-appointment-timing'],
        queryFn: fetchAvailableSlots,
        enabled: true // Enable query based on component mount
    });

    async function fetchAvailableSlots() {
        const payLoad = {
            "startDate": new Date(),
            "establishmentId": estData.id,
            "employeeId": "string",
            "totalDuration": 30,
            "serviceTags": ["hair"]
        };
        try {
            // Simulating API call with sampleData
            return sampleData;
        } catch (error) {
            console.error('Error fetching available slots:', error);
            return []; // Return empty array if there's an error
        }
    }

    const selectedDay = (val) => {
        const date = new Date(val);
        const year = date.getFullYear().toString().slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        
        // Filter availableTimeSlots based on selected date
        const filteredSlots = appointmentTimings?.find(slot => slot.availableDate === formattedDate);
        setAvailableTimeSlots(filteredSlots ? [filteredSlots] : []);
        dispatch(UpdateSelectedDate({ selectedDate: date }));
    };

    const handleClick = (timePeriod, slot, index) => {
        console.log(`Clicked chip Start Time ${timePeriod},- ${slot.startTime}, End Time - ${slot.endTime}`);
        dispatch(UpdateTimeOfDayAndTime({
            TimeOfDay: TimeOfDay[timePeriod],
            startTime: slot.startTime,
            endTime: slot.endTime,
            id: slot.id
        }));
    };

    return (
        <div className='mt-2 md:mx-16 my-10'>
            <div className='flex gap-3 mb-2 items-center'>
                <GetIcon iconName='BackIcon' onClick={() => onSetActiveStep(0)} />
                <div className='font-bold text-3xl'>Schedule</div>
            </div>

            <div className='mb-4'>
                <DatePicker
                    getSelectedDay={selectedDay}
                    endDate={30}
                    selectDate={selectedDate}
                    labelFormat={"MMMM"}
                    color={"black"}
                />
            </div>

            <div className='mt-4'>
                {!isLoading && availableTimeSlots?.length > 0 ? (
                    Object.entries(availableTimeSlots[0]?.availableSlots).map(([timePeriod, slotsArray]) => (
                        <div className='schedule-chips' key={timePeriod}>
                            <p className='font-semibold capitalize'>{timePeriod}</p>
                            <div className='flex items-center flex-wrap gap-2'>
                                {slotsArray?.map((slot, index) => (
                                    <div className='cursor-pointer' key={index}>
                                        <Chip
                                            label={`${slot.startTime} - ${slot.endTime}`}
                                            variant="outlined"
                                            onClick={() => handleClick(timePeriod, slot, index)}
                                            style={{ backgroundColor: slot.id === id ? '#E6E1FF' : 'inherit' }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Divider />
                        </div>
                    ))
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>No available slots for selected date.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
