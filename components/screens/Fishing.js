import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";
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
import {
  getDatabase,
  push,
  set,
  ref,
  onValue,
  remove,
  update,
} from "firebase/database";

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

export default function Fishing({ navigation, route }) {
  const { region } = route.params;
  const startLocation = {
    latitude: region.latitude,
    longitude: region.longitude,
  };
  const { tripKey } = route.params;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta,
  });

  const primaryButtonProps = {
    title: "I Got A Fish",
    onPress: () => addFish(),
  };

  const secondaryButtonProps = {
    title: "Stop",
    onPress: () => stopTracking(),
  };

  const addFish = () => {
    push(ref(database, "/fishing-trips/" + tripKey + "/fish"), {
      catchLocation: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      catchTime: Date.now(),
    });
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to get location");
      return;
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const { latitude, longitude } = location.coords;
    setCurrentLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const stopTracking = () => {
    navigation.navigate("Home"), navigation.push("Start Fishing");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        region={currentLocation}
        initialRegion={currentLocation}
      >
        <Marker coordinate={startLocation} title="Start" />
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
