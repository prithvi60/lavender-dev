import axios, { Axios } from 'axios';
import { BaseURL, establishmentSearch, establishmentDetails, customerProfile, userLogin, setBrowserCache, getBrowserCache, businessAppointment, userRegister } from './constants';

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

class Endpoint{

    async getUserLoginToken(payload){
        const response = await axiosInstance.post(`${BaseURL}${userLogin}`, payload)
        this.setTenantToken(response.data)
    }

    async userRegister(payload){
      const response = await axiosInstance.post(`${BaseURL}${userRegister}`, payload)
      return response
  }
  
    async getEstablishmentSearch(payload){
        const response = await axiosInstance.post(`${BaseURL}${establishmentSearch}`, payload)
        return response
    }

    async getEstablishmentDetailsById(id: any){
        const response = await axiosInstance.get(`${BaseURL}${establishmentDetails}${id}`)
        return response
    }

    async getCustomerProfile(){       
      const response = await axiosInstance.get(`${BaseURL}${customerProfile}`)
        return response
    }

    async getBusinessAppointments(payload){
        const response = await axiosInstance.get(`${BaseURL}${businessAppointment}`, payload)
        return response
    }

    async setTenantToken(data: any) {
    // add to cache
    setBrowserCache("Token", data.token)
    setBrowserCache("TokenExpiry", data.expiresIn)
    }
}
const endpoint = new Endpoint()
export default endpoint