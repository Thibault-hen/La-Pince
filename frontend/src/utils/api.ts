import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (
			error.response?.status === 404 ||
			error.response?.status === 401 ||
			error.response?.status === 500
		) {
			return Promise.resolve({ data: null, error: true });
		}

		return Promise.reject(error);
	},
);
