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

export function convertToDateTime(timeString, dateString) {

  // Parse the date string "24-07-06" to get year, month, and day
  const [shortYear, month, day] = dateString.split('-').map(Number);

  // Calculate the full year based on the short year format
  const fullYear = 2000 + shortYear;

  // Create a new Date object with the parsed values
  const date = new Date(fullYear, month - 1, day);

  // Parse the time string "6:00 PM" to get hours and minutes
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Adjust hours for PM time if necessary
  if (period === 'PM' && hours < 12) {
      hours += 12;
  }

  // Set hours and minutes to the Date object in local time
  date.setHours(hours, minutes, 0, 0);

  // Get UTC components
  const yearUTC = date.getFullYear();
  const monthUTC = String(date.getMonth() + 1).padStart(2, '0');
  const dayUTC = String(date.getDate()).padStart(2, '0');
  const hoursUTC = String(date.getHours()).padStart(2, '0');
  const minutesUTC = String(date.getMinutes()).padStart(2, '0');

  // Construct the ISO 8601 formatted date-time string in UTC
  const isoString = `${yearUTC}-${monthUTC}-${dayUTC}T${hoursUTC}:${minutesUTC}:00.000Z`;

  // Return the formatted ISO 8601 date-time string
  return isoString;
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
  const dateObj = moment.utc(date);
  return dateObj.format('h:mm A');
}

export function convertDateToReadAbleDate(dateStr) {
  // Define the ordinal suffixes
  const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Covers 11th to 13th
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  };
  
  // Parse the date string
  const [year, month, day] = dateStr?.split('-').map(Number);
  
  // Convert two-digit year to four-digit year (assuming current century)
  const fullYear = 2000 + year; 
  
  // Array of month names
  const months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
  
  // Construct the formatted date string
  const monthName = months[month - 1]; // month is 1-based
  const dayWithSuffix = `${day}${ordinalSuffix(day)}`;
  
  return `${dayWithSuffix} ${monthName} ${fullYear}`;
}

export function convertToReadAbleDate(dateString){
  // Create a Date object from the ISO date string
  const date = new Date(dateString);

  // Define options for formatting the date
  const options: any = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  };

  // Use Intl.DateTimeFormat to format the date according to the options
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
