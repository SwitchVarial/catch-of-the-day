import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";

export default function Fishing({ navigation, route }) {
  const { region } = route.params;
  const [fishLocation, setFishLocation] = useState();

  const getFishLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to get location");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;
    setFishLocation({
      latitude: latitude,
      longitude: longitude,
    });
    alert(latitude + " " + longitude);
  };

  const stopTracking = () => {
    if (isTracking == true) {
      alert("Are you sure?");
      navigation.navigate("Home");
    }
  };

  const primaryButtonProps = {
    title: "I Got A Fish",
    onPress: () => getFishLocation(),
  };

  const secondaryButtonProps = {
    title: "Stop",
    onPress: () => stopTracking(),
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} region={region} initialRegion={region}>
        <Marker coordinate={region} title="Start" />
      </MapView>
      <View style={styles.actionsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton {...primaryButtonProps} />
          <SecondaryButton {...secondaryButtonProps} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#174667",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  map: {
    flex: 2,
    width: "100%",
  },
  actionsContainer: {
    backgroundColor: "#174667",
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
});
