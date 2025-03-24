import "../../global.css";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import Logo from "@/components/svg/Logo";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function DashboardScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Inter: require("../../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
      Roboto: require("../../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
      "Space Grotesk": require("../../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
    });
    setFontsLoaded(true);
    SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Keep the splash screen visible while fonts are loading
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center px-4 bg-background">
      <View className="flex-col items-start gap-y-2 w-full">
        <Logo width={40} height={40} />
        <Text className="text-3xl text-left text-text-main font-accent">
          Welcome, Dashboard
        </Text>
      </View>
    </View>
  );
}
