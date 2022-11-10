import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import FishingDropDown from "../ui/forms/FishingDropDown";

export default function HomeScreen() {
  const delta = 0.05;
  const initialDelta = 8;
  const [title, setTitle] = useState("My Home");
  const [region, setRegion] = useState({
    latitude: 61.92410999999999,
    longitude: 25.748151,
    latitudeDelta: initialDelta,
    longitudeDelta: initialDelta,
  });

  const data = [
    { value: "Trolling", key: "1" },
    { value: "Casting", key: "2" },
    { value: "Fly fishing", key: "3" },
    { value: "Bait fishing", key: "4" },
  ];

  const [selected, setSelected] = useState("");

  const dropDownProps = {
    onSelect: () => alert(selected),
    data: data,
    setSelected: setSelected,
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to get location");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;
    setTitle("You are here");
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  const primaryButtonProps = {
    title: "Start",
    onPress: () => navigation.navigate("StartFishing"),
  };

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MapView style={styles.map} region={region} initialRegion={region}>
          <Marker coordinate={region} title={title} />
        </MapView>
        <View style={styles.actionsContainer}>
          <View style={styles.buttonContainer}>
            <FishingDropDown {...dropDownProps} />
            <PrimaryButton {...primaryButtonProps} />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#174667",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 95,
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