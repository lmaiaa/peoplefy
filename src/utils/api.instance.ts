import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const onError = (err: Error) => {
    return err;
};

api.interceptors.response.use(({data})=> data, onError);

export default api;