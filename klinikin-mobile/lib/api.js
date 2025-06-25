import axios from "axios";

const API = axios.create({
    baseURL: "http://192.168.188.22:4001/api",
    withCredentials: true,
})

export default API;