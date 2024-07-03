import dayjs from "dayjs";
import moment from 'moment';


export const convertTo_HH_AM = (date: Date): string => {
  var aa = dayjs(date).format("hh a");
  return aa;
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const formatDateString = (dateStr) => {
  const dateObj = new Date(dateStr);

  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const formattedDate = day + " " + monthNames[monthIndex] + " " + year;
  const formattedTime = hours + "." + (minutes < 10 ? "0" : "") + minutes;
  return { date: formattedDate, time: formattedTime };
};

export const convertToISO8601 = (timeStr, date) => {
  // Extracting components from the given time string
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Adjust hours based on AM/PM
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Combine the current date with the extracted time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Creating a new Date object for the combined datetime
  const combinedDateTime = new Date(
    `${formattedDate}T${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:00`
  );

  // Formatting the combined datetime into ISO 8601 with a timezone offset
  const timezoneOffset = "+08:00"; // Specific timezone offset
  const isoString = combinedDateTime.toISOString().replace("Z", timezoneOffset);

  return isoString;
};

export const convertToDateTime = (timeStr, date) => {
    // Extracting components from the given time string
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  
    // Adjust hours based on AM/PM
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }
  
    // Combine the current date with the extracted time
    const year = date.getFullYear();
    const month = date.getMonth(); // Months are 0-indexed
    const day = date.getDate();
  
    // Creating a new Date object for the combined datetime
    const combinedDateTime = new Date(year, month, day, hours, minutes, 0);
  
    // Calculate the timezone offset in minutes
    const targetTimezoneOffset = 8 * 60; // +08:00 in minutes
    const localTimezoneOffset = combinedDateTime.getTimezoneOffset(); // Local timezone offset in minutes
    const offsetDifference = targetTimezoneOffset - localTimezoneOffset;
  
    // Adjust the combinedDateTime by the offset difference
    combinedDateTime.setMinutes(combinedDateTime.getMinutes() + offsetDifference);
  
    return combinedDateTime;
}

export function convertToDateMonth(date){
  const formattedDate = moment(date).format('MM/YY');
  return formattedDate;
}
export function convertToDateOnly(date){
  const dateObj = moment(date);
  return dateObj.date();
}

export function convertToDayOnly(date){
  const dateObj = moment(date);
  return dateObj.format('dddd');
}

export function convertToMonthOnly(date){
  const dateObj = moment(date);
  return dateObj.format('MMMM');;
}

export function convertToYearOnly(date){
  const dateObj = moment(date);
  return dateObj.year();
}

export function convertToTimeOnly(date){
  const dateObj = moment(date);
  return dateObj.format('h:mm A');
}