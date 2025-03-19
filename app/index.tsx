import "../global.css";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
      Roboto: require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
      "Space Grotesk": require("../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
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
    <View className="flex-1 items-center justify-center">
      <Text className="font-primary text-2xl">This is Inter</Text>
      <Text className="font-secondary text-lg">This is Roboto</Text>
      <Text className="font-accent text-lg">This is Space Grotesk</Text>
    </View>
  );
}
