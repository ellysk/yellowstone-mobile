import { InfoList } from "@/components/InfoView";
import { ProfileView, ProfileViewProps } from "@/components/ProfileView";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchOperator } from "@/api";
import { Colors } from "@/constants/Colors";

export default function OperatorScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["operator", "OP001"], // Replace OP001 with actual operator ID
    queryFn: () => fetchOperator("OP001"),
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
        <Text className="text-lg text-error font-accent">
          Failed to load operator data
        </Text>
      </View>
    );
  }

  if (data) {
    const profileData: ProfileViewProps = {
      name: data.fullName,
      company: "Yellowstone Ranch",
      details: "A ranch from the show Yellowstone, since 1886",
      profileImage:
        "https://www.paramountshop.co.uk/cdn/shop/files/yellowstone-logo-sticker-assorted-pack-of-3-423554_1500x.png?v=1718295715",
    };

    const allowedTagZones = data.allowedTagZones.flatMap((zone) =>
      zone.districts.map((district) => ({
        title: `${zone.region}, ${district}`,
      }))
    );

    return (
      <View className="flex-1 flex-col gap-y-6 bg-background-main">
        <ProfileView {...profileData} />
        <View>
          <InfoList
            headerProps={{ header: "Allowed Tag Zones" }}
            data={allowedTagZones}
          />
        </View>
      </View>
    );
  }

  return null;
}
