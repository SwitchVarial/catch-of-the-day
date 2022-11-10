import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const primaryButtonProps = {
    title: "Start Fishing",
    onPress: () => navigation.navigate("StartFishing"),
  };

  const secondaryButtonProps = {
    title: "Secondary Button",
    onPress: () => alert("This is Home"),
  };

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <PrimaryButton {...primaryButtonProps} />
        <SecondaryButton {...secondaryButtonProps} />
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
