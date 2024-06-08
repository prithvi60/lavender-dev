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

export const getCurrentTime12HrFormat = (hours, minutes) => {
  
  const minutesStr = String(minutes).padStart(2, '0');
  // const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = String(hours).padStart(2, '0');

  return `${hoursStr}:${minutesStr}`;
}

export function getMonthAndDayNames(date) {

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedDate;
}

export function getWeekDateRangeFormat(startDate, endDate) {
  const options = { month: 'long', day: 'numeric' };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const yearFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric' });

  const start = formatter.format(startDate);
  const end = formatter.format(endDate);
  const year = yearFormatter.format(endDate);

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
  { date: new Date(2024, 5, 8, 0, 30), text: "first hi", howLong: 3, status: '#8280BA', employee: 'John test' },
  // { date: new Date(2024, 5, 8, 1, 30), text: "first hi", howLong: 3, status: '#35AFAC', employee: 'John test' },
  { date: new Date(2024, 5, 9, 19, 15), text: "second", howLong: 2, status: '#35AFAC', employee: 'John test' },
  { date: new Date(2024, 5, 10, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John two' },
  { date: new Date(2024, 5, 9, 13), text: "forth", howLong: 2, status: '#E6E1FF', employee: 'John test' },
  { date: new Date(2024, 5, 10, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John three' },
  { date: new Date(2024, 5, 8, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John four' },
  { date: new Date(2024, 5, 8, 13), text: "forth", howLong: 2, status: '#E6E1FF', employee: 'John five' },
  { date: new Date(2024, 5, 9, 14), text: "third", howLong: 2, status: '#FF83B0', employee: 'John six' },
  { date: new Date(2024, 5, 9, 19), text: "third", howLong: 2, status: '#FF83B0', employee: 'John five' },
  { date: new Date(2024, 5, 9, 3), text: "third", howLong: 2, status: '#FF83B0', employee: 'John three' },

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