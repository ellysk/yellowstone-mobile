import * as React from "react";
import { View, Text, ViewStyle, Image } from "react-native";

interface DashboardCardProps {
  /**
   * The total count to display
   */
  count?: number;
  /**
   * The icon URL to display
   */
  iconComponent: React.FC;
  /**
   * The label to display
   */
  label?: string;
  /**
   * Custom styles to apply to the card
   */
  width: ViewStyle["width"];
}

/**
 * A dashboard card component that displays a statistic with an icon
 */
const DashboardCard: React.FC<DashboardCardProps> = ({
  count = 24,
  iconComponent: IconComponent,
  label = "Total Properties",
  width = "auto",
}) => {
  return (
    <View
      className="flex-col items-end gap-y-2 p-4 bg-background-card rounded-lg shadow-md"
      style={{ width }}
    >
      <View className="h-12 w-12 items-center justify-center rounded-full bg-black">
        <IconComponent />
      </View>
      <View className="flex-col w-full gap-y-2">
        <Text className="text-left font-secondary text-sm text-text-main">
          {label}
        </Text>
        <Text className="text-left font-accent text-3xl color-secondary-500">
          {count}
        </Text>
      </View>
    </View>
  );
};

export default DashboardCard;
