import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { recentRids } from "@/lib/driversData";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [hasPermissions, setHasPermissions] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
    Alert.alert("dfsaf");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });

      setHasPermissions(true);
    };

    requestLocation();
  }, []);

  const loading = true;

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        className="px-5"
        keyboardShouldPersistTaps="handled"
        data={recentRids?.slice(0, 5)}
        keyExtractor={(item) => item.ride_id}
        renderItem={({ item }) => <RideCard ride={item} />}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  className="w-40 h-40"
                  source={images.noResult}
                  alt="No Recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No Recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator className="mt-5" size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-xl font-JakartaExtraBold capitalize">
                Welcome ,
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
                👏
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
