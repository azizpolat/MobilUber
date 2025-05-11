<<<<<<< HEAD

![simulator_screenshot_C3B32CCF-234D-49D1-9F36-DEA03C37ED18](https://github.com/user-attachments/assets/79bce03f-8d1e-4d1e-9e7a-380a446cdec2)
=======
Cashleri temizlemek için ===>>> npx expo start --clear
Cashleri temizlemek için ===>>> npx react-native start --reset-cache
build almak için ===>>> npx expo run:ios
swiper için ===>>> npm i react-native-swiper

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
className="flex-1 bg-white" >
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
            className="text-[15px] text-center text-general-200 mt-4"
          >
            <Text>Already have an account ? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>

);
};

export default SignUp;

import CustomerButton from "@/components/CustomerButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
const [form, setForm] = useState({
email: "",
password: "",
});

const onSignInPress = async () => {};

return (
<ScrollView
bounces={false}
contentContainerStyle={{ flexGrow: 1 }}
className="flex-1 bg-white" >
<View className="flex-1 bg-white">
<View className="relative w-full h-[250px]">
<Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
<Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
Welcome 👏
</Text>
</View>
<View className="p-5">
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
            title="Sing In"
            onPress={onSignInPress}
            className="mt-6 p-2"
          />
          <OAuth />
          <Link
            href="/sign-up"
            className="text-[15px] text-center text-general-200 mt-4"
          >
            <Text>Don't have an account ? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>

);
};

export default SignIn;
>>>>>>> 6df19e2 (clerk)
