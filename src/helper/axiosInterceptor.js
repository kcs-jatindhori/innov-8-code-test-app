import store from "../store";
import { logout } from "../actions/authActions";
import { toast } from 'react-toastify';
/**
 * Request intercept
 *
 */
const requestIntercept = (axios, store) => {

  axios.interceptors.request.use(
    config => {
      // Fetch access token
      const {
        user: { token }
      } = store.getState();
      // Embade token with request
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );
};

/**
 * Respopnse intercept
 */
const responseIntercept = (axios) => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    async (error) => {
      if (error.response) {
        const originalRequest = error.response.config;
        if (error.response.status === 401) {
          const urldata = originalRequest.url.split('/');
          if (urldata[urldata.length - 1] !== 'logout') {
            toast.success(error.response.data.message);
            store.dispatch(logout());
          }
        }
      }
      return Promise.reject(error);
    }
  )
};

export function setupAxios(axios, store) {
  requestIntercept(axios, store);
  responseIntercept(axios, store);
}
