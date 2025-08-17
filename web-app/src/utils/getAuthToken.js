// src/utils/getAuthToken.js
import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("authToken");
};
