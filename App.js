import React from "react";
import BottomNavigation from "./components/ui/navigation/BottomNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
