import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,

    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn('Sessão expirada ou não autorizada.');

                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }

            }
        } else if (error.request) {
            console.error('Erro de rede: O back-end pode estar fora do ar.', error.request);
        }

        return Promise.reject(error)
    }
)