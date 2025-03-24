import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Stack, Tabs } from "expo-router";
import * as React from "react";
import { Platform, Pressable, PressableProps, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Badge } from "~/components/nativewindui/Badge";
import { Text } from "~/components/nativewindui/Text";
import { cn } from "~/utils/cn";
import { Colors } from "~/constants/Colors";
import PropertyIcon from "@/components/svg/PropertyIcon";
import TenantLockIcon from "@/components/svg/TenantLockIcon";
import TenantHomeIcon from "@/components/svg/TenantHomeIcon";
import DashboardIcon from "@/components/svg/DashboardIcon";

export default function TabLayout() {
  return (
    <>
      <Stack.Screen options={{ title: "Tabs" }} />
      <Tabs
        tabBar={TAB_BAR}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.text.body,
          tabBarStyle: {
            backgroundColor: Colors.background.card,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon(props) {
              return <DashboardIcon {...props} width={27} height={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="properties"
          options={{
            title: "Properties",
            tabBarIcon(props) {
              return <PropertyIcon {...props} width={27} height={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="tenants"
          options={{
            title: "Tenants",
            tabBarIcon(props) {
              return <TenantLockIcon {...props} width={27} height={27} />;
            },
          }}
        />
        <Tabs.Screen
          name="landlord"
          options={{
            title: "Landlord",
            tabBarIcon(props) {
              return <TenantHomeIcon {...props} width={27} height={27} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}

const TAB_BAR = Platform.select({
  ios: undefined,
  android: (props: BottomTabBarProps) => <MaterialTabBar {...props} />,
});

const TAB_ICON = {
  index: "dashboard",
  properties: "properties",
  tenants: "tenants",
  landlord: "landlord",
} as const;

function MaterialTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingBottom: insets.bottom + 12,
      }}
      className="border-t-border/25 bg-card flex-row border-t pb-4 pt-3 dark:border-t-0"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <MaterialTabItem
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            name={TAB_ICON[route.name as keyof typeof TAB_ICON]}
            isFocused={isFocused}
            badge={options.tabBarBadge}
            label={
              typeof label === "function"
                ? label({
                    focused: isFocused,
                    color: isFocused ? Colors.primary : Colors.text.body,
                    children: options.title ?? route.name ?? "",
                    position: options.tabBarLabelPosition ?? "below-icon",
                  })
                : label
            }
          />
        );
      })}
    </View>
  );
}

function getTabIcon(name: string, size: number, color: string) {
  switch (name) {
    case "dashboard":
      return <DashboardIcon width={size} height={size} color={color} />;
    case "properties":
      return <PropertyIcon width={size} height={size} color={color} />;
    case "tenants":
      return <TenantLockIcon width={size} height={size} color={color} />;
    case "landlord":
      return <TenantHomeIcon width={size} height={size} color={color} />;
    default:
      return null;
  }
}

function MaterialTabItem({
  isFocused,
  name = "star",
  badge,
  className,
  label,
  ...pressableProps
}: {
  isFocused: boolean;
  name: string;
  label: string | React.ReactNode;
  badge?: number | string;
} & Omit<PressableProps, "children">) {
  const isFocusedDerived = useDerivedValue(() => isFocused);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [
        {
          scaleX: withTiming(isFocusedDerived.value ? 1 : 0, { duration: 200 }),
        },
      ],
      opacity: withTiming(isFocusedDerived.value ? 1 : 0, { duration: 200 }),
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      borderRadius: 100,
    };
  });
  return (
    <Pressable
      className={cn("flex-1 items-center", className)}
      {...pressableProps}
    >
      <View className="h-8 w-16 items-center justify-center overflow-hidden rounded-full ">
        <Animated.View
          style={animatedStyle}
          className="bg-secondary/70 dark:bg-secondary"
        />
        <View>
          {getTabIcon(name, 24, isFocused ? Colors.primary : Colors.text.body)}
          {!!badge && <Badge>{badge}</Badge>}
        </View>
      </View>
      <Text
        variant="caption2"
        className={cn("pt-1", !isFocused && "text-muted-foreground")}
      >
        {label}
      </Text>
    </Pressable>
  );
}
