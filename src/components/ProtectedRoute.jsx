import { Navigate, Outlet } from "react-router";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ isAllowed, children, redirectTo = '/' }) => {
    if(!isAllowed) {
        return <Navigate to={redirectTo}/>
    }
  return children ? children : <Outlet/>;
};
