import CustomerButton from "@/components/CustomerButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    try {
      // Asenkron işlemler burada yapılabilir
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/home"); // Yönlendirme
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👏
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.person}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            rightIcon={icons.passwordopen}
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomerButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6 p-2"
          />
          <OAuth />
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text className="text-[15px] text-center text-general-200 mt-4">
              Don't have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
