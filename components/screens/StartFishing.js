import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import FishingDropDown from "../ui/forms/FishingDropDown";
import { database } from "../utils/FireBaseConfig";
import { push, ref } from "firebase/database";
import { trackingStyles } from "./Styles";

export default function StartFishing({ navigation }) {
  // All needed useStates
  const delta = 0.05;
  const initialDelta = 8;
  const [selected, setSelected] = useState("");
  const [startLocation, setStartLocation] = useState({
    latitude: 61.92,
    longitude: 25.74,
    latitudeDelta: initialDelta,
    longitudeDelta: initialDelta,
    accuracy: null,
  });

  // Data and props for dropdown
  const data = [
    { value: "Trolling", key: "Trolling" },
    { value: "Casting", key: "Casting" },
    { value: "Fly fishing", key: "Fly fishing" },
    { value: "Bait fishing", key: "Bait fishing" },
  ];
  const dropDownProps = {
    data: data,
    setSelected: setSelected,
  };

  // Get current location TODO: make component
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
    const { accuracy } = location.coords;
    setStartLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
      accuracy: accuracy,
    });
  };

  // Start Fishing and save data to realtime database
  const startFishing = async () => {
    const startTime = Date.now();
    const tripKey = push(ref(database, "/fishing-trips"), {
      startLocation: startLocation,
      startTime: startTime,
      fishingType: selected,
    }).key;
    await navigation.navigate("Fishing", { startLocation, tripKey });
  };

  // Disable start button if loation is not set and if fishing type is not selected
  const disableStartButton = () => {
    const { accuracy } = startLocation;
    if (accuracy === null || selected == "") {
      return true;
    } else {
      return false;
    }
  };

  // Props for start button
  const startButtonProps = {
    title: "Start",
    disabled: disableStartButton(),
    onPress: () => startFishing(),
  };

  // Use effect
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    disableStartButton();
  }, [startLocation]);

  return (
    <View style={trackingStyles.container}>
      <StatusBar style="auto" />
      <MapView
        style={trackingStyles.map}
        region={startLocation}
        initialRegion={startLocation}
      >
        {startLocation ? (
          <Marker coordinate={startLocation} title="You are here" />
        ) : null}
      </MapView>
      <View style={trackingStyles.actionsContainer}>
        <View style={trackingStyles.buttonContainer}>
          <FishingDropDown {...dropDownProps} />
          <PrimaryButton {...startButtonProps} />
        </View>
      </View>
    </View>
  );
}
