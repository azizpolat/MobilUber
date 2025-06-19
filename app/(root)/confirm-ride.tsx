import CustomerButton from "@/components/CustomerButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";
import { router } from "expo-router";
import { FlatList, View } from "react-native";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a Driver" snapPoints={["45%", "75%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) =>
          item?.ride_id?.toString?.() ?? `driver-${index}`
        }
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver}
            setSelected={() => setSelectedDriver(item)}
          />
        )}
        ListFooterComponent={
          <View className="mt-10 mx-5">
            <CustomerButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
              className="p-3"
            />
          </View>
        }
      />
    </RideLayout>
  );
};

export default ConfirmRide;
