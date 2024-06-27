export const BaseURL = 'http://dev.agilemadhi.in/lavender-api/'

export const establishmentSearch = 'e/estsearch'

export const establishmentDetails = 'e/getEstablishmentDetails/'

export const customerProfile = 'c/getCustomerProfile'

export const businessAppointment = 'b/getAppointmentList'

export const userLogin = 'u/login'

export const currentUserDetails = 'u/getCurrentUserDetails'

export const userRegister = 'u/signUp'

export const updateProfile = 'u/updateProfile'

export const availableSlots = 'a/fetchAvailableSlots'

export const appointmentBooking = 'a/saveAppointmentBooking'

export const saveEstablishment = 'e/saveEstablishment/profile'

export const saveWorkingHours = 'e/saveEstablishment/timeslot'

export const uploadPhotos = 'e/saveEstablishmentImage/'

export const publish = 'e/saveEstablishment/publish'

export const service = 'e/saveEstablishment/service'

export const category = 'e/saveEstablishment/category'

export const savePhotos = 'e/getEstablishmentImage/'

export const saveImageId = 'e/saveEstablishment/images'

export const additionalInformation = 'e/saveEstablishment/additional'

export const addService = 'e/saveEstablishment/service'

export const deleteService = 'e/saveEstablishment/service/delete'

export const saveEmployee = 'e/saveEstablishment/employee'


export function setBrowserCache(key: string, value: any) {
    window.localStorage.setItem(key, value)
}

export function getBrowserCache(key: string) {
    return window.localStorage.getItem(key)
}
