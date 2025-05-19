import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { recentRids } from "@/lib/driversData";

import { useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function Page() {
  const { user } = useUser();

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
      />
    </SafeAreaView>
  );
}
