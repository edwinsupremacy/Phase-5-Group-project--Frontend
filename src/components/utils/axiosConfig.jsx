import axios from 'axios';

const refreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:5000/refresh', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
            }
        });
        localStorage.setItem('access_token', response.data.access_token);
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Optionally handle refresh token failures (e.g., logout user)
    }
};

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const { response } = error;
        if (response && response.status === 401 && response.data.message === 'Token has expired') {
            await refreshToken();
            return axiosInstance(error.config);  // Retry the original request with the new token
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
