import { useSelector } from 'react-redux';

export const range = (keyCount) => [...Array(keyCount).keys()]


export const areDatesSame = (first, second) => {

  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
}

export const addDateBy = (date, count) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + count))
}

export const getMonday = () => {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  return new Date(today.setDate(first))
}

export const getFormattedTimeRange = (date, duration) => {
  const start = date
  const end = addTime(start, 'minutes', duration)
  const startMinutes = start.getMinutes();
  const startHour = start.getHours()
  const startTime = getCurrentTime12HrFormat(startHour, startMinutes, true)

  const endMinutes = end.getMinutes();
  const endHour = end.getHours()
  const endTime = getCurrentTime12HrFormat(endHour, endMinutes, true)
  //03:00 AM - 05:00 AM
  return `${startTime} - ${endTime}`;
}

export const getCurrentTime12HrFormat = (hours, minutes, includeMerdians = false) => {
  
  const minutesStr = String(minutes).padStart(2, '0');
  const ampm = hours >= 12 ? ' PM' : ' AM';

  const hoursStr = String(hours % 12 || 12).padStart(2, '0');

  return `${hoursStr}:${minutesStr}${includeMerdians ? ampm : ''}`;
}

export function getMonthAndDayNames(date) {

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  //Ex: Sunday, June 16, 2024
  return formattedDate;
}

export function getWeekDateRangeFormat(startDate, endDate) {
  const options = { month: 'long', day: 'numeric' };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const yearFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric' });

  const start = formatter.format(startDate);
  const end = formatter.format(endDate);
  const year = yearFormatter.format(endDate);

  //Ex: June 17 - June 23, 2024
  return `${start} - ${end}, ${year}`;
}

export function addTime(date, range, value) {
  let result = new Date(date);

  switch(range) {
    case 'days':
      result.setDate(result.getDate() + value);
      break;
    case 'months':
      result.setMonth(result.getMonth() + value);
      break;
    case 'years':
      result.setFullYear(result.getFullYear() + value);
      break;
    case 'hours': 
    result.setHours(result.getHours() + value);
      break;
    case 'minutes': 
    result.setMinutes(result.getMinutes() + value);
      break;
    case 'seconds': 
    result.setSeconds(result.getSeconds() + value);
      break;
    default:
      break;
  }
  return result;
}

export function filterByDateRange(appointments, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return appointments.filter(appointment => {
    const date = new Date(appointment.date);
    return date >= start && date <= end;
  });
}

export function filterByDate(appointments, selectedDate) {
  const date = new Date(selectedDate);

  return appointments.filter(appointment => {
    const appointmentdate = new Date(appointment.date);
    return areDatesSame(appointmentdate, date);
  });
}

//Parser Utils and constants

export const appointments = [
  {  date: new Date(2024, 5, 16, 0), text: "first hi", howLong: 1, statusColor: '#8280BA', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  // {  date: new Date(2024, 5, 8, 1, 30), text: "first hi", howLong: 3, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 19, 15), text: "second", howLong: 2, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 11), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John two', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 13), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 11), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 11), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John four', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 13), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 14), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 19), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John five', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 16, 3), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },

  // { date: new Date(), text: "Current appointment", howLong: 2, status: '#', employee: 'John four' },
]

export function filterAppointmentsByDate(appointments, selectedDate) {
  let filteredAppointments = []
  filteredAppointments= filterByDate(appointments, selectedDate)
  return filteredAppointments
}

export function groupAppointmentsByEmployee(appointments) {
  const grouped = {};
  const employees = []
  
  appointments.forEach(appointment => {
    const employee = appointment.employee;
    employees.push(employee)
    if (!grouped[employee]) {
      grouped[employee] = { employee, appointments: [] };
    }
    
    grouped[employee].appointments.push(appointment);
  });

  return Object.values(grouped);
}

export function getEmployeesList(establishmentState) {
  if(true){
    return ['John test', 'John two', 'John three', 'John four', 'John five', 'John six']
  }
  const employees = []
  //TODO: use the reducer to get the establishment data
  establishmentState?.establishmentData?.employees?.forEach(employee => {
    employees.push(employee?.employeeName)
  });

  return employees;
}