import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default Layout;
