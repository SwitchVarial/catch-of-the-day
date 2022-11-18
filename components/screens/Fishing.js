import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import SecondaryButton from "../ui/buttons/SecondaryButton";
import { push, ref, onValue } from "firebase/database";
import { Stopwatch } from "react-native-stopwatch-timer";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import LabelText from "../ui/texts/LabelText";
import InfoText from "../ui/texts/InfoText";
import { database } from "../utils/FireBaseConfig";
import FishButton from "../../assets/FishButton.png";
import StartIcon from "../../assets/StartIcon.png";
import { trackingStyles, stopwatchOptions } from "./Styles";
import { getCurrentLocation } from "../utils/Location";

export default function Fishing({ navigation, route }) {
  // Data from route
  let startLocation;
  let tripKey;
  if (route.params !== undefined) {
    startLocation = route.params.startLocation;
    tripKey = route.params.tripKey;
  }

  // All needed useStates
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [fishCount, setFishCount] = useState(0);
  const [tripData, setTripData] = useState([]);
  const [fishData, setFishData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(startLocation);

  // Add fish and save data to realtime database
  const addFish = async () => {
    setFishCount(fishCount + 1);
    await push(ref(database, "/fishing-trips/" + tripKey + "/fish"), {
      catchLocation: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      },
      catchTime: Date.now(),
    });
  };

  // Get current location
  const getLocation = async () => {
    const location = await getCurrentLocation();
    setCurrentLocation(location);
  };

  // Stop tracking and go to save fishint trip screen
  const stopTracking = () => {
    setIsStopwatchStart(false);
    setResetStopwatch(true);
    navigation.navigate("Save Fishing", {
      tripData,
      fishData,
      fishCount,
      currentLocation,
      tripKey,
    });
  };

  // Props for I got a fish button and stop button
  const addFishButtonProps = {
    title: "I Got A Fish",
    onPress: () => addFish(),
  };
  const stopButtonProps = {
    title: "Stop",
    onPress: () => stopTracking(),
  };

  // Use effect for current location
  useEffect(() => {
    const interval = setInterval(() => {
      // getCurrentLocation();
      getLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Use effect for stopwatch and setting fish count to zero
  useEffect(() => {
    setIsStopwatchStart(true);
    setResetStopwatch(false);
    setFishCount(0);
  }, []);

  // Use effect get fishing trip data from realtime database
  useEffect(() => {
    const itemsRef = ref(database, "/fishing-trips/" + tripKey);
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setTripData(data);
      } else {
        setTripData([]);
      }
    });
  }, []);

  // Use effect set fish data
  useEffect(() => {
    const data = tripData.fish;
    const fish = data
      ? Object.keys(data).map((key) => ({ key, ...data[key] }))
      : [];
    setFishData(fish);
  }, [tripData]);

  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_800ExtraBold,
  });
  if (!fontsLoaded) {
    return;
  } else {
    return (
      <View style={trackingStyles.container}>
        <StatusBar style="auto" />
        <MapView
          style={trackingStyles.map}
          region={currentLocation}
          initialRegion={currentLocation}
        >
          {tripData.startLocation !== undefined ? (
            <Marker coordinate={tripData.startLocation} title="Start">
              <Image source={StartIcon} />
            </Marker>
          ) : null}
          {fishData
            ? fishData.map((value, index) => {
                return (
                  <Marker
                    coordinate={value.catchLocation}
                    key={index}
                    title={
                      "Fish No." +
                      (index + 1) +
                      " caught at " +
                      new Date(value.catchTime).toLocaleString("en-US", {
                        timeStyle: "short",
                      })
                    }
                  >
                    <Image source={FishButton} />
                  </Marker>
                );
              })
            : null}
        </MapView>
        <View style={trackingStyles.rowContainer}>
          <View style={trackingStyles.infoContainer}>
            <InfoText label={fishCount} />
            <LabelText label="Fish caught" />
          </View>
          <View style={trackingStyles.infoContainer}>
            <Stopwatch
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={stopwatchOptions}
            />
            <LabelText label="Duration" />
          </View>
        </View>
        <View style={trackingStyles.actionsContainer}>
          <View style={trackingStyles.buttonContainer}>
            <PrimaryButton {...addFishButtonProps} />
            <SecondaryButton {...stopButtonProps} />
          </View>
        </View>
      </View>
    );
  }
}
