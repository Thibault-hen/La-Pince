import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	validateStatus: (status) => {
		return status < 500;
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status >= 400) {
			return Promise.resolve({ data: null, error: true });
		}

		return Promise.reject(error);
	},
);
