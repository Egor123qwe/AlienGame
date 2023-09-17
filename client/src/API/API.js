import axios from "axios"

export const baseURL = 'localhost:8000/'

const instance = axios.create({
    baseURL: 'http://' + baseURL, 
})

export default instance