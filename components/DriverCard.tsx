import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  const driver = item;
  console.log("driversss", driver);

  const isSelected = selected === item?.ride_id;
  console.log("secilen", isSelected);

  return (
    <TouchableOpacity
      onPress={() => setSelected?.()}
      className={`${
        isSelected ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <Image
        source={{ uri: driver?.profile_image_url }}
        className="w-14 h-14 rounded-full"
      />

      <View className="flex-1 mx-3">
        <Text className="text-lg font-JakartaRegular">
          {driver?.first_name} {driver?.last_name}
        </Text>
        <Text className="text-sm">
          {driver?.rating} ⭐ | {driver?.car_seats} koltuk
        </Text>
        <Text className="text-sm">
          ${item?.fare_price} | {formatTime(item?.ride_time ?? 5)}
        </Text>
      </View>

      <Image source={{ uri: driver?.car_image_url }} className="h-14 w-14" />
    </TouchableOpacity>
  );
};

export default DriverCard;
