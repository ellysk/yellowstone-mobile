import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardCard from "@/components/DashboardCard";
import BarCodeIcon from "@/components/svg/BarCodeIcon";
import getGridItemWidth from "@/utils/getGridItemWidth";
import { fetchTotalTags } from "@/api";
import { Colors } from "@/constants/Colors";

export default function DashBoardScreen() {
  const cardWidth = getGridItemWidth(2, 16);

  const { data, error, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTotalTags,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-error font-accent">{error.message}</Text>
      </View>
    );
  }

  if (data) {
    return (
      <ScrollView className="flex-1 bg-background">
        <View className="flex-1 px-4 py-6">
          <Text className="text-3xl text-left text-text-main font-accent mb-6">
            Tag Scanning Overview
          </Text>

          {/* Total Tags Section */}
          <View className="mb-8">
            <Text className="text-xl text-text-main font-accent mb-4">
              Total Tags Scanned
            </Text>
            <DashboardCard
              count={data.count}
              iconComponent={BarCodeIcon}
              label="Total Tags"
              width={cardWidth}
            />
          </View>

          {/* Tags by Region Section */}
          <View className="mb-8">
            <Text className="text-xl text-text-main font-accent mb-4">
              Tags by Region
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {data.region?.map((region) => (
                <DashboardCard
                  key={region.name}
                  count={region.count}
                  iconComponent={BarCodeIcon}
                  label={region.name}
                  width={cardWidth}
                />
              ))}
            </View>
          </View>

          {/* Tags by District Section */}
          <View className="mb-8">
            <Text className="text-xl text-text-main font-accent mb-4">
              Tags by District
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {data.district?.map((district) => (
                <DashboardCard
                  key={district.name}
                  count={district.count}
                  iconComponent={BarCodeIcon}
                  label={district.name}
                  width={cardWidth}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return null;
}
