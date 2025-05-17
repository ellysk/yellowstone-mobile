import { View, Text } from "react-native";

export default function OperatorScreen() {
  return (
    <View className="flex-1 items-center justify-center px-4 bg-background">
      <View className="flex-col items-start gap-y-2 w-full">
        <Text className="text-3xl text-left text-text-main font-accent">
          Welcome, Operator
        </Text>
      </View>
    </View>
  );
}
