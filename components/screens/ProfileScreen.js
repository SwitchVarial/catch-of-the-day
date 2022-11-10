import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import HomeIcon from "../ui/icons/HomeIcon";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const buttonProps = {
    title: "Profile",
    onPress: () => alert("This is Profile"),
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text>This is ProfileScreen</Text>
        <PrimaryButton {...buttonProps} />
        <HomeIcon />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#174667",
    alignItems: "center",
    justifyContent: "center",
  },
});
