import axios from "axios";
import qs from 'querystring';

const baseURL = "https://lms-backend.sandboxprosolutions.com/"
export const BASE_SMS_URL = process.env.REACT_APP_SMS_API_URL;

 const axiosIntance = axios.create({
    baseURL
})
export const smsOriginalInstance = axios.create({
    baseURL: BASE_SMS_URL,
    timeout: 30000,
})

export const smsAxiosInstanceCreator = (baseURL : string) => {
    return axios.create({
        baseURL,
        timeout : 30000
    })
}


export default axiosIntance;