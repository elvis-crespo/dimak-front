import axios from "axios";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "./config";
import { logoutUser } from "../redux/userReducer";

const token = localStorage.getItem("user");

const tokenObj = JSON.parse(token);
const authToken = tokenObj?.auth;

const access_token = authToken?.accessToken;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Acciones de Redux para logout
      const dispatch = useDispatch();
      dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
