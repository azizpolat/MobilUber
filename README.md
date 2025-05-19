
<<<<<<< HEAD

![simulator_screenshot_CD911ADA-16C5-4982-89A2-252514E8EDC3](https://github.com/user-attachments/assets/b79aa6fa-82d2-4e87-b8e8-38bfde5775f6)
=======
// const { isLoaded, signIn, setActive } = useSignIn();
// const { signUp } = useSignUp();
// const router = useRouter();
// const [pendingVerification, setPendingVerification] = useState(false);
// const [code, setCode] = useState("");

// const [form, setForm] = useState({
// email: "",
// password: "",
// });

// const onSignInPress = async () => {
// if (!isLoaded) return;

// try {
// const signInAttempt = await signIn.create({
// identifier: form.email,
// password: form.password,
// });

// if (signInAttempt.status === "complete") {
// await setActive({ session: signInAttempt.createdSessionId });
// router.replace("/(root)/(tabs)/home");
// } else {
// console.log(JSON.stringify(signInAttempt, null, 2));
// Alert.alert("Error", "Log in failed. Please try again.");
// }
// } catch (err) {
// console.log(JSON.stringify(err, null, 2));
// Alert.alert(
// "Error",
// err.errors[0]?.longMessage || "An unexpected error occurred."
// );
// }
// };

// const onVerifyPress = async () => {
// if (!isLoaded) return;

// try {
// const signUpAttempt = await signUp.attemptEmailAddressVerification({
// code,
// });

// if (signUpAttempt.status === "complete") {
// await setActive({ session: signUpAttempt.createdSessionId });
// router.replace("/");
// } else {
// console.error(JSON.stringify(signUpAttempt, null, 2));
// }
// } catch (err) {
// console.error(JSON.stringify(err, null, 2));
// Alert.alert("Error", "Verification failed. Please check your code.");
// }
// };

// if (pendingVerification) {
// return (
// <View className="flex-1 justify-center items-center p-5 bg-white">
// <Text className="text-lg font-bold mb-3">Verify Your Email</Text>
// <TextInput
// value={code}
// placeholder="Enter your verification code"
// onChangeText={(code) => setCode(code)}
// className="border w-full p-2 mb-4"
// />
// <CustomerButton title="Verify" onPress={onVerifyPress} />
// </View>
// );
// }
>>>>>>> 0ac9d89 (geogrfy and components)
