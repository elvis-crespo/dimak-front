import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUser } from "../redux/userReducer";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Swal from "sweetalert2"; 
import axios from "axios";
import { API_BASE_URL } from "../utils/config";

export const useAuth = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Verifica el token en localStorage
  const checkAuth = () => {
    const token = localStorage.getItem("user");

    if (!token) {
      dispatch(logoutUser());
      return;
    }

    const tokenObj = JSON.parse(token);
    const authToken = tokenObj?.auth;

    const nameIdentity =
      user?.[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const refreshToken = authToken?.refreshToken;

    if (!authToken) {
      dispatch(logoutUser());
      return;
    }

    const decoded = jwtDecode(authToken.accessToken);

    if (!decoded) {
      dispatch(logoutUser());
      return;
    }

    const isTokenValid = decoded.exp * 1000 > Date.now();

    if (!isTokenValid) {

      Swal.fire({
        title: "Tu sesión ha expirado",
        text: "¿Deseas continuar trabajando?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "No, salir",
      }).then((result) => {
        if (result.isConfirmed) {
          // Realiza la solicitud para obtener un nuevo accessToken
          refreshTokenRequest(nameIdentity, refreshToken);
        } else {
          dispatch(logoutUser()); 
        }
      });
    }
  };

  // Función para obtener el nuevo token
  const refreshTokenRequest = async (nameIdentifier, refreshToken) => {
    try {
      const request = await axios.post(
        `${API_BASE_URL}/auth/refresh-token`,
        {
          userId: nameIdentifier,
          refreshToken: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = request.data;
      const newAccessToken = response.accessToken;

      if (!newAccessToken) {
        dispatch(logoutUser()); 
        return;
      }

      const userData = jwtDecode(newAccessToken); 

       dispatch(updateUser({ response, userData }));
    } catch (error) {
      alert(error);
      dispatch(logoutUser()); 
    }
  };

  useEffect(() => {
    checkAuth();

    let interval;
    if (isLoggedIn) {
      interval = setInterval(() => {
        checkAuth(); 
      }, 15000);
    }

    return () => {
      if (interval) {
        clearInterval(interval); 
      }
    };
  }, [dispatch, isLoggedIn]);

  return { isLoggedIn, user };
};
