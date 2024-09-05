export const BaseURL = `${process.env.REACT_APP_API_BASE_URL}/lavender-api/`;

export const establishmentSearch = "e/estsearch";

export const establishmentDetails = "e/getEstablishmentDetails/";

export const customerProfile = "c/getCustomerProfile";

export const businessAppointment = "a/getAppointmentList";

export const userLogin = "u/login";

export const currentUserDetails = "u/getCurrentUserDetails";

export const userRegister = "u/signUp";

export const changePassword = "/u/changePd";

export const updateProfile = "u/updateProfile";

export const availableSlots = "a/fetchAvailableSlots";

export const appointmentBooking = "a/saveAppointmentBooking";

export const saveEstablishment = "e/saveEstablishment/profile";

export const saveWorkingHours = "e/saveEstablishment/timeslot";

export const uploadPhotos = "e/saveEstablishmentImage/";

export const publish = "e/saveEstablishment/publish";

export const service = "e/saveEstablishment/service";

export const category = "e/saveEstablishment/category";

export const savePhotos = "e/getEstablishmentImage/";

export const saveImageId = "e/saveEstablishment/images";

export const saveEmpImageId = "e/saveEmployee/images";

export const additionalInformation = "e/saveEstablishment/additional";

export const addService = "e/saveEstablishment/service";

export const deleteService = "e/saveEstablishment/service/delete";

export const deleteCategory = "e/saveEstablishment/category/delete";

export const saveEmployee = "e/saveEstablishment/employee";

export const saveCard = "c/saveCardInfo";

export const cancelAppointment = "a/updateAppointmentStatus";

export const saveReviews = "a/saveAppointmentReview";

export const getReviews = "e/getEstablishmentReviews";

export const getTreatmentServices = "em/getServices";

export const getCategoryServices = "em/getCategories";

export const treatmentServicesByLocation = "ef/getEstablishmentsByLocation";

export const treatmentServicesByDate = "ef/getEstablishmentsByDate";

export const treatmentServicesByTime = "ef/getEstablishmentsByTime";

export const establishmentSearchResult = "ef/getEstablishments";

export const membershipTypesList = "package/list";

export const subscriptionInitiate = "subscription/business/membership/initiate";

export const subscriptionStatus = "subscription/status";

export const clients = 'a/getClients';

export const customerSubscriptionInitiate =
  "subscription/customer/appointment/initiate";

export const oauthGoogleLogin =
  "u/oauth/google";

export function setBrowserCache(key: string, value: any) {
  window.localStorage.setItem(key, value);
}

export function getBrowserCache(key: string) {
  return window.localStorage.getItem(key);
}
