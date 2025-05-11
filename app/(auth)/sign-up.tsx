import CustomerButton from "@/components/CustomerButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    try {
      // Asenkron işlemler burada yapılabilir
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/home"); // Yönlendirme
    } catch (error) {
      console.error("Kayıt hatası:", error);
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
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.person}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            rightIcon={icons.passwordopen}
            placeholder="Enter your password"
            secureTextEntry={true}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomerButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6 p-2"
          />
          <OAuth />
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text className="text-[15px] text-center text-general-200 mt-4">
              Already have an account?{" "}
              <Text className="text-primary-500">Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
