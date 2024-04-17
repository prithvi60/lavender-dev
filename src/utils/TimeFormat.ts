import dayjs from "dayjs"

export const convertTo_HH_AM = (date:Date) : string=>{
    var aa = dayjs(date).format('hh a')
    return aa
}
