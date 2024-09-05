import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { TOKEN } from "../constants/variables";
import { getToken, removeToken } from "../services/storage"; // Giả sử bạn có hàm để xóa token
import { getMe } from "../services/AuthUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();
  const getAuthenticatedUser = async () => {
    const data = await getMe();
    if (data) {
      setAuthUser(data.user);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken("authToken");
        if (token) {
          await getAuthenticatedUser();
          if (authUser) {
            router.replace("main/HomePage"); // Redirect to home if authenticated
          }
        } else {
          router.replace("Welcome"); // Redirect to welcome screen if not authenticated
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        router.replace("Welcome"); // Fallback to welcome screen
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!authUser) {
      router.replace("Welcome");
    }
  }, [authUser]);

  const setAuth = () => {
    getAuthenticatedUser();
  };

  const logout = async () => {
    console.log("remove");
    await removeToken("authToken");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
