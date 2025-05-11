import CustomerButton from "@/components/CustomerButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {};

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
          <View className="flex">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.person}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
          </View>

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
            title="Sing Up"
            onPress={onSignUpPress}
            className="mt-6 p-2"
          />
          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-5"
          >
            <Text>Alreaddy have an account ? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

// <SafeAreaView className="flex items-center h-full justify-between bg-white">
//       <TouchableOpacity
//         className="w-full flex justify-end items-end p-5"
//         onPress={() => {
//           router.replace("/(auth)/welcome");
//         }}
//       >
//         <Text>Skipdsefsf</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
