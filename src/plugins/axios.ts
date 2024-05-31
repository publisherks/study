import axios from 'axios';

import url from '@/utils/url';

/**
 * Axios 인스턴스
 * @see {@link https://axios-http.com/kr}
 */
const api = axios.create({
    baseURL: (
        import.meta.env.VITE_API_PROXY
        || import.meta.env.VITE_API_URL
        || url({
            host: import.meta.env.VITE_API_HOST,
            port: import.meta.env.VITE_API_PORT,
        })
    ),
});

export default api;
