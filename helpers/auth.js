import { useRouter } from "expo-router";

export const handleUnauthorized = () => {
  const router = useRouter();
  router.replace("Login");
};
