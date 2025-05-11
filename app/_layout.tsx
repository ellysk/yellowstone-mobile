import "../global.css";
import { SplashScreen } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
    Roboto: require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    "Space Grotesk": require("../assets/fonts/SpaceGrotesk-VariableFont_wght.ttf"),
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Keep the splash screen visible while fonts are loading
    return null;
  }

  return (
    <View
      className="flex-1 bg-background-main"
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StatusBar style="dark" />
      {/* Set to "dark" or "light" based on your theme */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
