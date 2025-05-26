import { Driver, MarkerData } from "@/types/type";
import Constants from "expo-constants";

const directionsAPI = Constants.expoConfig?.extra?.googleMapsApiKey;
if (!directionsAPI) {
  throw new Error("EXPO_PUBLIC_GOOGLE_API_KEY tanımlı değil!");
}

/**
 * Driver[] dizisinden MarkerData[] yaratır.
 */
export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;

    return {
      ...driver,
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
    };
  });
};

/**
 * Harita için uygun region objesini döner.
 */
export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  // Kullanıcı koordinatı yoksa default SF bölgesi
  if (userLatitude == null || userLongitude == null) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // Hedef yoksa sadece kullanıcı etrafı
  if (destinationLatitude == null || destinationLongitude == null) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // Kullanıcı ve hedef arasını kapsayan region
  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3;
  const longitudeDelta = (maxLng - minLng) * 1.3;

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

/**
 * Her marker için önce kullanıcıya sonra hedefe varış sürelerini (dk) ve
 * tahmini fiyatı hesaplar.
 */
export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}): Promise<(MarkerData & { time: number; price: string })[]> => {
  // Gerekli tüm koordinatlar yoksa boş dizi
  if (
    userLatitude == null ||
    userLongitude == null ||
    destinationLatitude == null ||
    destinationLongitude == null
  ) {
    return [];
  }

  const results = await Promise.all(
    markers.map(async (marker) => {
      // Marker → kullanıcı
      const resToUser = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
      );
      const dataToUser = await resToUser.json();
      const timeToUser =
        dataToUser.routes?.[0]?.legs?.[0]?.duration?.value ?? 0;

      // Kullanıcı → hedef
      const resToDest = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
      );
      const dataToDest = await resToDest.json();
      const timeToDest =
        dataToDest.routes?.[0]?.legs?.[0]?.duration?.value ?? 0;

      const totalTimeMin = (timeToUser + timeToDest) / 60;
      const price = (totalTimeMin * 0.5).toFixed(2);

      return {
        ...marker,
        time: totalTimeMin,
        price,
      };
    })
  );

  return results;
};
