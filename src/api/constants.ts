export const BaseURL = 'http://dev.agilemadhi.in/lavender-api/'

export const establishmentSearch = 'p/estsearch'

export const establishmentDetails = 'p/getEstablishmentDetails/'

export const customerProfile = 'c/getCustomerProfile'

export const businessAppointment = 'b/getAppointmentList'

export const userLogin = 'au/login'

export const userRegister = 'au/signUp'

export const appointmentBooking = 'c/saveAppointmentBooking'

export function setBrowserCache(key: string, value: any) {
    window.localStorage.setItem(key, value)
}

export function getBrowserCache(key: string) {
    return window.localStorage.getItem(key)
}
