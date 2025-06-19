import CustomerButton from "@/components/CustomerButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

// export async function fetchAutocompleteResults(placeId: string) {
//   try {
//     const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === "OK") {
//       const location = data.result.geometry.location;
//       console.log("aziz", location);

//       return {
//         latitude: location.lat,
//         longitude: location.lng,
//         address: data.result.formatted_address,
//       };
//     } else {
//       throw new Error(`Google Place Details API error: ${data.status}`);
//     }
//   } catch (error) {
//     console.error("Error fetching place details:", error);
//     return null;
//   }
// }

// const FindRide = () => {
//   const {
//     userAddress,
//     setUserLocation,
//     setDestinationLocation,
//     destinationAddress,
//   } = useLocationStore();

//   useEffect(() => {
//     fetchAutocompleteResults("Istanbul").then(async (results) => {
//       if (results && results.length > 0) {
//         const placeId = results[0].place_id;
//         const placeDetails = await fetchPlaceDetails(placeId);
//         if (placeDetails) {
//           setDestinationLocation(placeDetails);
//         }
//       } else {
//         setDestinationLocation({
//           latitude: 37.7817,
//           longitude: -122.4041,
//           address: "Civic Center, SF",
//         });
//       }
//     });
//   }, []);

const FindRide = () => {
  const {
    userAddress,
    setUserLocation,
    setDestinationLocation,
    destinationAddress,
  } = useLocationStore();

  useEffect(() => {
    setDestinationLocation({
      latitude: 37.7817,
      longitude: -122.4041,
      address: "Civic Center, SF",
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
