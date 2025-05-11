import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.replace("/(auth)/welcome")}>
        <Text>SignIn</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn;
