import axios from 'axios';

const _axios = axios.create({
    baseURL: 'https://www.server.alecvo.com/.netlify/functions/gogonow/',
    withCredentials: true,
})

export default _axios;
