export const BaseURL = 'http://dev.agilemadhi.in/lavender-api/'

export const establishmentSearch = 'p/estsearch'

export const establishmentDetails = 'e/getEstablishmentDetails/'

export const customerProfile = 'c/getCustomerProfile'

export const businessAppointment = 'b/getAppointmentList'

export const userLogin = 'u/login'

export const currentUserDetails = 'u/getCurrentUserDetails'

export const userRegister = 'u/signUp'

export const availableSlots = 'c/fetchAvailableSlots'

export const appointmentBooking = 'c/saveAppointmentBooking'

export const saveEstablishment = 'e/saveEstablishment/profile'

export const saveWorkingHours = 'e/saveEstablishment/timeslot'

export const uploadPhotos = 'e/saveEstablishmentImage/EST00002507'

export const publish = 'e/saveEstablishment/publish'

export const service = 'e/saveEstablishment/service'

export const category = 'e/saveEstablishment/category'

export const savePhotos = 'e/getEstablishmentImage/EST00002507/'


export function setBrowserCache(key: string, value: any) {
    window.localStorage.setItem(key, value)
}

export function getBrowserCache(key: string) {
    return window.localStorage.getItem(key)
}
