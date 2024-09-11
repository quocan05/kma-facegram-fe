import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/AuthUser";
import { getToken, removeToken } from "../services/storage"; // Assume you have token removal function

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent premature redirection
  const router = useRouter();

  const getAuthenticatedUser = async () => {
    try {
      const data = await getMe();
      if (data) {
        setAuthUser(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken("authToken");
        if (token) {
          await getAuthenticatedUser();
        }
        setLoading(false); // Loading is done whether authUser exists or not
      } catch (error) {
        console.error("Error checking authentication", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (authUser) {
        router.replace("main/HomePage"); // Redirect to HomePage if authenticated
      } else {
        router.replace("Welcome"); // Redirect to Welcome if not authenticated
      }
    }
  }, [authUser, loading]); // Only run this after loading is done and authUser has a value

  const setAuth = () => {
    getAuthenticatedUser();
  };

  const logout = async () => {
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
