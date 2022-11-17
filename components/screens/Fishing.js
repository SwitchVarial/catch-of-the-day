import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
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

export default function Fishing({ navigation, route }) {
  const { region } = route.params;
  const { tripKey } = route.params;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta,
    accuracy: null,
  });
  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [fishCount, setFishCount] = useState(0);
  const [tripData, setTripData] = useState([]);
  const [fishData, setFishData] = useState([]);

  const primaryButtonProps = {
    title: "I Got A Fish",
    onPress: () => addFish(),
  };

  const secondaryButtonProps = {
    title: "Stop",
    onPress: () => stopTracking(),
  };

  const addFish = () => {
    setFishCount(fishCount + 1);
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
    const { accuracy } = location.coords;
    setCurrentLocation({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
      accuracy: accuracy,
    });
  };

  const stopTracking = () => {
    navigation.navigate("Save Fishing", {
      tripData,
      fishData,
      fishCount,
      currentLocation,
    });
    setIsStopwatchStart(false);
    setResetStopwatch(true);
    setFishCount(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsStopwatchStart(true);
    setResetStopwatch(false);
  }, []);

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

  useEffect(() => {
    const itemsRef = ref(database, "/fishing-trips/" + tripKey + "/fish");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const fish = data
        ? Object.keys(data).map((key) => ({ key, ...data[key] }))
        : [];
      setFishData(fish);
    });
  }, []);

  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_800ExtraBold,
  });
  if (!fontsLoaded) {
    return;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <MapView
          style={styles.map}
          region={currentLocation}
          initialRegion={currentLocation}
        >
          <Marker coordinate={tripData.startLocation} title="Start">
            <Image source={StartIcon} style={{ height: 20, width: 20 }} />
          </Marker>
          {fishData.map((value, index) => {
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
                <Image source={FishButton} style={{ height: 40, width: 40 }} />
              </Marker>
            );
          })}
        </MapView>
        <View style={styles.rowContainer}>
          <View style={styles.infoContainer}>
            <InfoText label={fishCount} />
            <LabelText label="Fish caught" />
          </View>
          <View style={styles.infoContainer}>
            <Stopwatch
              start={isStopwatchStart}
              //To start
              reset={resetStopwatch}
              //To reset
              options={options}
              //options for the styling
            />
            <LabelText label="Duration" />
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton {...primaryButtonProps} />
            <SecondaryButton {...secondaryButtonProps} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#174667",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 15,
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stopwatchContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
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

const options = {
  container: {
    padding: 0,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#68C4B6",
    marginLeft: 7,
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    textTransform: "uppercase",
    fontSize: 28,
  },
};
