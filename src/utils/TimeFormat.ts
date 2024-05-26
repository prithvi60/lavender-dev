import dayjs from "dayjs"

export const convertTo_HH_AM = (date:Date) : string=>{
    var aa = dayjs(date).format('hh a')
    return aa
}
const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
];
export const formatDateString = (dateStr) => {
    const dateObj = new Date(dateStr);
    console.log(dateObj.toLocaleString())

    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
        
    const formattedDate = day + " " + monthNames[monthIndex] + " " + year
    const formattedTime = hours + "." + (minutes < 10 ? '0' : '') + minutes;
    console.log(formattedDate, formattedTime);
    return {date: formattedDate, time: formattedTime}
}