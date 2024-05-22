export const BaseURL = 'http://dev.agilemadhi.in/lavender-api/'

export const establishmentSearch = 'p/estsearch'

export const establishmentDetails = 'p/getEstablishmentDetails/'

export const customerProfile = 'c/getCustomerProfile'

export const userLogin = 'au/login'

export function setBrowserCache(key: string, value: any) {
    window.localStorage.setItem(key, value)
}

export function getBrowserCache(key: string) {
    return window.localStorage.getItem(key)
}