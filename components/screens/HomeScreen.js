import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";

export default function HomeScreen({ navigation, route }) {
  const [isTracking, setIsTracking] = useState(false);

  const primaryButtonProps = {
    title: "Start Fishing",
    onPress: () => navigation.navigate("StartFishing", { isTracking }),
  };

  const secondaryButtonProps = {
    title: "Secondary Button",
    onPress: () => alert("This is Home"),
  };

  return (
    <View style={styles.container}>
      <PrimaryButton {...primaryButtonProps} />
      <SecondaryButton {...secondaryButtonProps} />
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
