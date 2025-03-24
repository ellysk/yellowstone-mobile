import { View, Text } from "react-native";
import Logo from "@/components/svg/Logo";

export default function LandlordScreen() {
  return (
    <View className="flex-1 items-center justify-center px-4 bg-background">
      <View className="flex-col items-start gap-y-2 w-full">
        <Logo width={40} height={40} />
        <Text className="text-3xl text-left text-text-main font-accent">
          Welcome, Landlord
        </Text>
      </View>
    </View>
  );
}
