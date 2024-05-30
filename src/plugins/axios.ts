import axios from 'axios';

import convertURL from '@/utils/url';

const { VITE_API_HOST: host, VITE_API_PORT: port, VITE_API_URL: url, VITE_API_PROXY: proxy } = import.meta.env;

/**
 * Axios 인스턴스
 * @see {@link https://axios-http.com/kr}
 */
const api = axios.create({
    baseURL: (
        proxy
        || url
        || convertURL({
            host,
            port,
        })
    ),
});

export default api;
