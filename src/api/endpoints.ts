import axios, { Axios } from "axios";
import {
  BaseURL,
  establishmentSearch,
  establishmentDetails,
  customerProfile,
  userLogin,
  setBrowserCache,
  appointmentBooking,
  getBrowserCache,
  businessAppointment,
  userRegister,
  availableSlots,
  currentUserDetails,
} from "./constants";
import {
  IAvailableSlots,
  IScheduleAppointmentList,
} from "../interface/interface";

const axiosInstance = axios.create({
  baseURL: BaseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getBrowserCache("Token");
    if (token) {
      config.headers.authtoken = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class Endpoint {
  async getUserLoginToken(payload) {
    const response = await axiosInstance.post(
      `${BaseURL}${userLogin}`,
      payload
    );
    this.setTenantToken(response.data);
  }

  async userRegister(payload) {
    const response = await axiosInstance.post(
      `${BaseURL}${userRegister}`,
      payload
    );
    return response;
  }

  async getCurrentUserDetails(payload) {
    const response = await axiosInstance.get(`${BaseURL}${currentUserDetails}`);
    return response;
  }

  async getEstablishmentSearch(payload) {
    const response = await axiosInstance.post(
      `${BaseURL}${establishmentSearch}`,
      payload
    );
    return response;
  }

  async getEstablishmentDetailsById(id: any) {
    const response = await axiosInstance.get(
      `${BaseURL}${establishmentDetails}${id}`
    );
    return response;
  }

  async getCustomerProfile() {
    const response = await axiosInstance.get(`${BaseURL}${customerProfile}`);
    return response;
  }

  async getBusinessAppointments(payload) {
    const response = await axiosInstance.post(
      `${BaseURL}${businessAppointment}`,
      payload
    );
    return response;
  }

  async getAvailableSlots(payload): Promise<IScheduleAppointmentList[]> {
    const response = await axiosInstance.post(
      `${BaseURL}${availableSlots}`,
      payload
    );
    const result = FormAvailableSlotsModel(response);

    return result?.data;
  }

  async saveAppointmentBookings(payload) {
    

    const response = await axiosInstance.post(
      `${BaseURL}${appointmentBooking}`,
      payload
    );
    
    return response;
  }

  async setTenantToken(data: any) {
    // add to cache
    setBrowserCache("Token", data.token);
    setBrowserCache("TokenExpiry", data.expiresIn);
  }
}

function FormAvailableSlotsModel(response) {
  let keyvalue = 1;
  

  response.data.map((item) => {
    Object.keys(item.availableSlots).forEach((period) => {
      item.availableSlots[period as keyof IAvailableSlots].forEach((slot) => {
        slot.isSelected = false;
        // slot.id = keyvalue;
        slot.id = item.availableDate + slot.startTime;

        keyvalue++;
      });
    });
    return response;
  });

  return response;
}

const endpoint = new Endpoint();
export default endpoint;
