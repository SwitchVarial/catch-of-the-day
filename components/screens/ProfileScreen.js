import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import HomeIcon from "../ui/icons/HomeIcon";

export default function ProfileScreen({ navigation }) {
  const buttonProps = {
    title: "Profile",
    onPress: () => alert("This is Profile"),
  };

  return (
    <View style={styles.container}>
      <Text>This is ProfileScreen</Text>
      <PrimaryButton {...buttonProps} />
      <HomeIcon />
      <StatusBar style="auto" />
    </View>
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
