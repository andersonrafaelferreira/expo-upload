import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://192.168.15.11:3333'
    baseURL: 'https://3333-ca7e6b3f-4905-4c27-9e0a-e2e554702115.ws-us02.gitpod.io',
    // baseURL: 'http://192.168.0.101:3333'
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})

export default api;