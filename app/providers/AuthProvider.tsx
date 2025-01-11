import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const isTokenExpired = (token: any) => {
    try {
      const decoded = jwtDecode(token);
      return Date.now() / 1000 > decoded.exp;
    } catch (error) {
      console.error("Invalid token detected:", error.message);
      logout(); // Log out the user if the token is invalid
      return true; // Consider the token expired if it can't be decoded
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      setAccessToken(token);
      try {
        const decodedData = jwtDecode(token);
        setUserInfo(decodedData?.data);
      } catch (error) {
        console.error("Failed to decode token:", error.message);
        logout(); // Log out if decoding fails
      }
    }
  }, []);

  const login = (token) => {
    try {
      setAccessToken(token);
      localStorage.setItem("token", token);
      const decodedData = jwtDecode(token);
      setUserInfo(decodedData?.data);
    } catch (error) {
      console.error("Failed to decode token during login:", error.message);
      logout(); // Log out if decoding fails
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("token");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, accessToken, isLoading, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
