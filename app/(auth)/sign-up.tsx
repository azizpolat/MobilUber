import CustomerButton from "@/components/CustomerButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "Beklenmeyen bir hata oluştu.";
      Alert.alert("Error", errorMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "failed",
        });
      }
    } catch (err) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "Doğrulama başarısız.";
      setVerification({
        ...verification,
        error: errorMessage,
        state: "failed",
      });
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
            maxLength={20}
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

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl text-center font-JakartaExtraBold">
              Verification
            </Text>
            <Text className="font-Jakarta text-center mb-2 mt-2">
              We have sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              autoFocus={true}
              maxLength={6}
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(value) => {
                setVerification({ ...verification, code: value });
              }}
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomerButton
              title="Verify Email"
              onPress={onVerifyPress}
              className="bg-success-500 mt-2 p-2"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[100px] h-[100px] mx-auto my-5"
            />
            <Text className="text-3xl text-center font-JakartaBold">
              Verified
            </Text>
            <Text className="text-gray-400 mt-2 font-Jakarta text-center mb-2">
              You have successfully verified your account
            </Text>
            <CustomerButton
              title="Browse Home"
              className="mt-2 p-2"
              onPress={() => {
                router.push("/(root)/(tabs)/home");
                setShowSuccessModal(false);
              }}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
