import axios from 'axios';

const axiosInstance = axios.create({
   // local instance of firebase function
    // baseURL:"http://127.0.0.1:5001/clone-10728/us-central1/api",
      // deployed version of render.com
    baseURL:"https://azg-server.onrender.com/",
})
export {axiosInstance}
