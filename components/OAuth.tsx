import { icons } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Image, Text, View } from "react-native";
import CustomerButton from "./CustomerButton";

const OAuth = () => {
  // Web tarayıcısını ısındırır (Expo için önemli)
  // useWarmUpBrowser();

  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri({
            scheme: "myapp",
          }),
        });

      if (createdSessionId) {
        if (setActive) {
          await setActive?.({ session: createdSessionId });
          if (signUp?.createdUserId) {
            await fetchAPI("/(api)/user", {
              method: "POST",
              body: JSON.stringify({
                name: `${signUp.firstName} ${signUp.lastName}`,
                email: signUp.emailAddress,
                clerkId: signUp.createdUserId,
              }),
            });
          }
          await setActive({ session: createdSessionId });

          setTimeout(() => {
            router.replace("/(root)/(tabs)/home");
          }, 500);

          return {
            success: true,
            code: "success",
            message: "You have Successfully authenticated",
          };
        }
      } else {
        console.warn("Giriş tamamlanamadı, MFA gibi adımlar gerekebilir.");
      }
    } catch (err) {
      console.error("Google SSO hatası:", JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomerButton
        title="Login with Google"
        className="mt-3 p-2 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
