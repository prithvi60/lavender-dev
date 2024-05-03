import axios, { Axios } from 'axios';
import { BaseURL, establishmentSearch, establishmentDetails, customerProfile } from './constants';

class Endpoint{

    async getEstablishmentSearch(payload){
        const response = await axios.post(`${BaseURL}${establishmentSearch}`, payload)
        return response
    }

    async getEstablishmentDetailsById(id: any){
        const response = await axios.get(`${BaseURL}${establishmentDetails}${id}`)
        return response
    }

    async getCustomerProfile(){
        const response = await axios.get(`${BaseURL}${customerProfile}`)
        return response
    }
}
const endpoint = new Endpoint()
export default endpoint