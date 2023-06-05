import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  
  let auth = { accessToken: false };
  return auth.accessToken ? <Outlet /> : <Navigate to="/authentification" />;

};

