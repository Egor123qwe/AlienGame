import axios from "axios"

export const baseURL = '172.20.10.3:8000/'

const instance = axios.create({
    baseURL: 'http://' + baseURL, 
})

export default instance