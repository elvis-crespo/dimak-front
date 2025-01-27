import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../redux/userReducer";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const dispatch = useDispatch();

  // Obtenemos el estado desde Redux
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    // Verificar si el token es válido cada vez que el componente se renderiza
    if (user) {
      const tokenData = JSON.parse(sessionStorage.getItem("user"));
      console.log("tokenData", tokenData.accessToken);
      if (tokenData?.accessToken) {
        try {
          const decodedToken = jwtDecode(tokenData.accessToken);
          if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(logoutUser()); // Token expirado
          }
        } catch (error) {
          console.error("Error decodificando el token:", error);
          dispatch(logoutUser());
        }
      }
    }
  }, [dispatch, user]);

  return {
    isLoggedIn,
    isLoading,
    user,
    logout: () => dispatch(logoutUser()),
  };
};
