import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import FishingDropDown from "../ui/forms/FishingDropDown";
import { initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGIN_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
import { getDatabase, push, ref } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGIN_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function StartFishing({ navigation }) {
  const delta = 0.05;
  const initialDelta = 8;
  const [title, setTitle] = useState("My Home");
  const [region, setRegion] = useState({
    latitude: 61.92,
    longitude: 25.74,
    latitudeDelta: initialDelta,
    longitudeDelta: initialDelta,
  });

  const data = [
    { value: "Trolling", key: "Trolling" },
    { value: "Casting", key: "Casting" },
    { value: "Fly fishing", key: "Fly fishing" },
    { value: "Bait fishing", key: "Bait fishing" },
  ];

  const [selected, setSelected] = useState("");

  const dropDownProps = {
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

  const startFishing = async () => {
    if (selected == "") {
      alert("Select fishing type to start fishing");
    } else {
      const tripKey = push(ref(database, "/fishing-trips"), {
        startLocation: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
        startTime: Date.now(),
        fishingType: selected,
      }).key;
      navigation.navigate("Fishing", { region, tripKey });
    }
  };

  const primaryButtonProps = {
    title: "Start",
    onPress: () => startFishing(),
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
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
