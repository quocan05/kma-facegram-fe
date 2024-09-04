import Loading from "@/components/loading/Loading";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Loading />
    </View>
  );
};

export default index;
