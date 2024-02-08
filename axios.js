import axios from "axios";

const instance = axios.create({
    baseURL: 'https://signin-register-form.onrender.com/api/'
})

export default instance