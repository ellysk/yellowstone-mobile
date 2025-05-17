import { ScrollView, View, Text } from "react-native";
import DashboardCard from "@/components/DashboardCard";
import BarCodeIcon from "@/components/svg/BarCodeIcon";
import getGridItemWidth from "@/utils/getGridItemWidth";

// Mock data - you should replace this with real data from your backend
const mockData = {
  totalTags: 156,
  byRegion: [
    { name: "North", count: 45 },
    { name: "South", count: 65 },
    { name: "East", count: 25 },
    { name: "West", count: 21 },
  ],
  byDistrict: [
    { name: "District 1", count: 30 },
    { name: "District 2", count: 40 },
    { name: "District 3", count: 35 },
    { name: "District 4", count: 25 },
    { name: "District 5", count: 26 },
  ],
};

export default function DashBoardScreen() {
  const cardWidth = getGridItemWidth(2, 16); // 2 columns, 16px gap

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
            count={mockData.totalTags}
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
            {mockData.byRegion.map((region) => (
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
            {mockData.byDistrict.map((district) => (
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
