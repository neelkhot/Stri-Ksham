import { Navigate } from "react-router-dom";
import { getStoredCustomer } from "../utils/axiosConfig";

export const PrivateRoutes = ({ children }) => {
  const getTokenFromLocalStorage = getStoredCustomer();
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
