export const range = (keyCount) => [...Array(keyCount).keys()]


export const areDatesSame = (first, second) => {
    console.log("areDatesSame >>",first.getFullYear() === second.getFullYear(),
    first.getMonth() === second.getMonth() ,
    first.getDate() === second.getDate())
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
    return appointmentdate === date;
  });
}