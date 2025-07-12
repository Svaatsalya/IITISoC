import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({ 
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds
    withCredentials: true,  // 🔥 Add this!
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

//Request Intercepter
axiosInstance.interceptors.request.use ((config) => {
    const accessToken = localStorage.getItem('token')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;  // 🔥 This was missing!
},
(error) => {
    return Promise.reject(error)
}
)

//responce
axiosInstance.interceptors.response.use((response) =>{
    return response;

},
(error) =>{
    if(error.response){
        // The request was made and the server responded with a status code
        if(error.response.status == 401){
            window.location.href = '/'
        }
        else if(error.response.status == 500){
            console.log("Server Error")
        }
    }
        else if(error.code === 'ECONNABORTED') {
            console.log("Timeout Error")
            }
            return Promise.reject(error);
    

   }

)

export default axiosInstance;