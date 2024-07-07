import { useSelector } from 'react-redux';
import { differenceInMinutes } from 'date-fns';

export const range = (keyCount) => [...Array(keyCount).keys()]

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const areDatesSame = (first, second) => {
  return first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()
}

export const addDateBy = (date, count) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + count))
}

export const getDifferenceInMinutes = (end, start) => {

const date1 = new Date(start);
const date2 = new Date(end);

const diffInMinutes = differenceInMinutes(date2, date1);
return diffInMinutes
}
export const getMonday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (today.getDay() === 0 ? 6 : (today.getDay() - 1));
  const monday = today.getDate() - diff;
  console.log("getMonday >>", monday, today.getDay(), today.getDate(), diff)
  return new Date(today.setDate(monday))
}

export const getWeekEndDate = () => {
  const monday = getMonday()
  monday.setHours(23,59,0,0)
  const weekEndDate = addTime(monday, 'days', 6)
  console.log("getWeekEndDate >", weekEndDate)
  return weekEndDate
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
  if(minutes === 60){
    minutes = 0
    hours += 1
  }
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

export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  
  //Ex: 22-06-2024
  return `${day}-${month}-${year}`;
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

//below two util functionalities is expected to behandled by BE
export function filterByDate(appointments, selectedDate) {
  const date = new Date(selectedDate);

  return appointments.filter(appointment => {
    const appointmentdate = new Date(appointment.date);
    return areDatesSame(appointmentdate, date);
  });
}

//Parser Utils and constants

export const appointments = [
  {  date: new Date(2024, 5, 27, 0), text: "first hi", howLong: 1, statusColor: '#8280BA', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  // {  date: new Date(2024, 5, 8, 1, 30), text: "first hi", howLong: 3, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 19, 15), text: "second", howLong: 2, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 4), text: "third1", howLong: 2, statusColor: '#FF83B0', employee: 'John two', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 13), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 11), text: "third2", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 11), text: "third3", howLong: 2, statusColor: '#FF83B0', employee: 'John four', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 13), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 14), text: "third4", howLong: 2, statusColor: '#FF83B0', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 19), text: "third5", howLong: 2, statusColor: '#FF83B0', employee: 'John five', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 27, 3), text: "third6", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },

  // { date: new Date(), text: "Current appointment", howLong: 2, status: '#', employee: 'John four' },
]

export const weekappointments = [
  {  date: new Date(2024, 5, 17, 0), text: "first hi", howLong: 1, statusColor: '#8280BA', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  // {  date: new Date(2024, 5, 8, 1, 30), text: "first hi", howLong: 3, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 18, 0, 15), text: "second", howLong: 2, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 19, 0), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John two', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 20, 0), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 20, 6), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 21, 0), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 22, 1), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John four', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 23, 1), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 24, 1), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 25, 1), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John five', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 26, 1), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },

  {  date: new Date(2024, 5, 18, 10, 15), text: "second", howLong: 2, statusColor: '#35AFAC', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 19, 10), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John two', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 20, 10), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 20, 16), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 21, 10), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 22, 11), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John four', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 23, 1), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 23, 3, 30), text: "forth", howLong: 2, statusColor: '#E6E1FF', employee: 'John test', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 24, 14), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John six', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 25, 13), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John five', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 28, 12), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 28, 1), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 29, 2), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 29, 12), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  {  date: new Date(2024, 5, 29, 1), text: "third", howLong: 2, statusColor: '#FF83B0', employee: 'John three', client: 'Olivia', status: 'Confirmed', service: 'Layered Long Haircut', price: '$228', bookedThrough: 'Online Booking', estimatedDuration: '20 mins - 60 mins', },
  
  // { date: new Date(), text: "Current appointment", howLong: 2, status: '#', employee: 'John four' },
]

export function filterAppointmentsByDate(appointments, selectedDate) {
  let filteredAppointments = []
  filteredAppointments= filterByDate(appointments, selectedDate)

  return filteredAppointments
}

function filterAppointmentsByDateRange(data, startDate, endDate) {

  const appointments = {};

  data.forEach(item => {
      const itemDate = new Date(item.date);

      if (itemDate >= startDate && endDate >= itemDate) {
        const formattedDate = formatDate(itemDate);
        console.log("test app test", formattedDate)
          if(appointments[formattedDate]){
            appointments[formattedDate].push(item);
          }
          else{
            appointments[formattedDate] = [item]
          }
      }
  });

  return appointments;
}

export const groupAppointments = (range, appointments, currentDate, weekStartDate, weekEndDate) => {

  console.log("groupAppointments >", weekEndDate)
  let filteredAppointments = []
  if(range === 'Day') {
    filteredAppointments = groupAppointmentsBy(filterAppointmentsByDate(appointments, currentDate), 'Employee') //groupAppointmentsByEmployee(filterAppointmentsByDate(appointments, currentDate))
    console.log("groupEmployees day", filteredAppointments)
  }
  else {
    filteredAppointments = groupAppointmentsBy(appointments, 'Date') //filterAppointmentsByDateRange(appointments, weekStartDate, weekEndDate)
    console.log("groupEmployees week", filteredAppointments)
  }

  return filteredAppointments
}

export function groupAppointmentsByEmployee(appointments) {
  const grouped = {};

  appointments.forEach(appointment => {
    const employee = appointment.employee;
    if (!grouped[employee]) {
      grouped[employee] = { employee, appointments: [] };
    }
    
    grouped[employee].appointments.push(appointment);
  });

  return grouped
  //return Object.values(grouped);
}

export const getSelectedWeekDetails = (startDate) => {
  const week = []
  DAYS.map((day, index) => {
    week.push({
      date: addTime(startDate, 'days', index),
      day
    })
  })
  return week
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

function isOverlapping(appointment1, appointment2) {
  return appointment1.start < appointment2.end && appointment1.end > appointment2.start;
}

function mergeGroups(groups) {
  let merged = [];
  while (groups.length) {
      let group = groups.pop();
      let mergeInto = null;
      for (let i = 0; i < merged.length; i++) {
          if (group.some(appointment => merged[i].some(a => isOverlapping(a, appointment)))) {
              mergeInto = merged[i];
              break;
          }
      }
      if (mergeInto) {
          mergeInto.push(...group);
      } else {
          merged.push(group);
      }
  }
  return merged;
}

function groupAppointmentsBy(appointments, filterBy) {

  const appointmentsArr = appointments.map((appointment) => {
    return {
      ...appointment,
      start: appointment.date,
      end: addTime(appointment.date, 'minutes', appointment.howLong )
    }
  })
  appointmentsArr.sort((a, b) => a.start - b.start);

  let groupedBy = {};
  appointmentsArr.forEach(appointment => {
    if(filterBy === 'Date') {
      const date = formatDate(appointment.start);
      if (!groupedBy[date]) {
          groupedBy[date] = [];
      }
      groupedBy[date].push(appointment);
    }
    else{
        const employee = appointment.employee;
        if (!groupedBy[employee]) {
          groupedBy[employee] = [];
        }
        groupedBy[employee].push(appointment);
    }
  });

  console.log("groupAppointmentsBy >", groupedBy)
  let groupedAppointments = {};
  for (let date in groupedBy) {
      let dateGroup = groupedBy[date];
      let overlappingGroups = [];
      dateGroup.forEach(appointment => {
          let placed = false;
          for (let group of overlappingGroups) {
              if (group.every(a => isOverlapping(a, appointment))) {
                  group.push(appointment);
                  placed = true;
                  break;
              }
          }
          if (!placed) {
              overlappingGroups.push([appointment]);
          }
      });
      groupedAppointments[date] = mergeGroups(overlappingGroups);
  }

  return groupedAppointments;
}

export function parseAppointmentResponse(response) {
  const parsedResponse = []

  response?.forEach((booking) => {
    const {bookingId, customerName, startTime, endTime,
      totalDuration, 
      //services, 
      serviceName,
      employeeName, totalCost, bookingStatus, bookingType } = booking
      const temp =   {  
        date: new Date(startTime), 
        howLong: getDifferenceInMinutes(endTime, startTime),
        statusColor: '#35AFAC', 
        employee: employeeName,
        client: customerName,
        status: bookingStatus,
        service: serviceName, 
        price: totalCost, 
        bookedThrough: bookingType,
        estimatedDuration: '20 mins - 60 mins', 
      }

    parsedResponse.push(temp)
  })
  return parsedResponse
}