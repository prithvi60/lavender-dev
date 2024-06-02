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