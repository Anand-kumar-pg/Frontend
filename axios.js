import axios from "axios";

const instance = axios.create({
    baseURL: 'https://signin-register.onrender.com'
})

export default instance