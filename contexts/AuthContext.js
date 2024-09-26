import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/AuthUser";
import { getToken, removeToken } from "../services/storage"; // Assume you have token removal function
import { getListFollower, getListFollowing } from "../services/UserService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authFollowers, setAuthFollowers] = useState([]);
  const [authFollowings, setAuthFollowings] = useState([]);

  const [loading, setLoading] = useState(true); // To prevent premature redirection
  const router = useRouter();

  const getAuthenticatedUser = async () => {
    try {
      const data = await getMe();
      if (data) {
        setAuthUser(data.user);
        const follower = await getListFollower(data.user._id);
        setAuthFollowers(follower.followers);
        const following = await getListFollowing(data.user._id);
        setAuthFollowings(following.followings);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const setAuth = () => {
    getAuthenticatedUser();
  };

  const logout = async () => {
    await removeToken("authToken");
    setAuthUser(null);
  };

  const reloadFollow = async (userId) => {
    console.log("click");
    const follower = await getListFollower(userId);
    setAuthFollowers(follower.followers);
    const following = await getListFollowing(userId);
    setAuthFollowings(following.followings);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken("authToken");
        if (token) {
          await getAuthenticatedUser();
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Runs once on mount, no need for additional dependencies

  useEffect(() => {
    if (!loading) {
      if (authUser) {
        router.replace("main/HomePage");
      } else {
        router.replace("Welcome");
      }
    }
  }, [authUser, loading]); // Dependent on loading and authUser status

  useEffect(() => {
    console.log("followers changes: ", authFollowers);
    console.log("followings changes:", authFollowings);
  }, [authFollowers, authFollowings]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authFollowers,
        authFollowings,
        setAuth,
        logout,
        reloadFollow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
