import axios, { Axios } from 'axios';

export const BaseURL = 'http://[2a01:4f9:c012:5961::1]'
class Endpoint{

    async getEstablishmentSearch(payload){
        const response = await axios.post(`${BaseURL}/customer/estsearch`, payload)
        return response
    }

    async getEstablishemntDetails(){
        const response = await axios.get('http://[2a01:4f9:c012:5961::1]/admin/getEstablishmentList')
        return response
    }

    async getEstablishmentDetailsById(id: any){
        const response = await axios.get(`${BaseURL}/admin/getEstablishment/${id}`)
        return response
    }
}
const endpoint = new Endpoint()
export default endpoint