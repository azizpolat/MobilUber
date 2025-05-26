import CustomerButton from "@/components/CustomerButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export async function fetchAutocompleteResults(input) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      return data.predictions;
    } else {
      throw new Error(`Google Places Autocomplete API error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error fetching autocomplete results:", error);
    return null;
  }
}

const FindRide = () => {
  const {
    userAddress,
    setUserLocation,
    setDestinationLocation,
    destinationAddress,
  } = useLocationStore();

  useEffect(() => {
    fetchAutocompleteResults("Istanbul").then((results) => {
      if (results && results.length > 0) {
        setDestinationLocation({
          latitude: 0,
          longitude: 0,
          address: results[0].description,
        });
      } else {
        setDestinationLocation({
          latitude: 0,
          longitude: 0,
          address: "No results found",
        });
      }
    });
  }, []);

  return (
    <RideLayout title="Ride" snapPoints={["55%"]}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) =>
            setDestinationLocation({
              latitude: location.latitude,
              longitude: location.longitude,
              address: location.address,
            })
          }
        />
      </View>
      <CustomerButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-ride")}
        className="p-2"
      />
    </RideLayout>
  );
};

export default FindRide;
