import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FishButton from "../../assets/FishButton.png";
import StartIcon from "../../assets/StartIcon.png";
import EndIcon from "../../assets/EndIcon.png";
import { trackingStyles } from "./Styles";
import { database } from "../utils/FireBaseConfig";
import { ref, remove, update } from "firebase/database";
import { CommonActions } from "@react-navigation/native";

export default function SaveFishing({ navigation, route }) {
  const { tripData, fishData, fishCount, currentLocation, tripKey } =
    route.params;
  const endTime = Date.now();
  const elapsedTime = new Date(endTime - tripData.startTime)
    .toISOString()
    .slice(11, 19);
  const elapsedTimeMilli = new Date(endTime - tripData.startTime).getTime();

  // Save fishing trip end data
  const saveTrip = async () => {
    await update(ref(database, "/fishing-trips/" + tripKey), {
      endLocation: currentLocation,
      endTime: endTime,
      elapsedTime: elapsedTimeMilli,
      fishCount: fishCount,
    });
    navigation.navigate("Home"),
      navigation.push("Start Fishing"),
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Start Fishing" }],
        })
      );
  };

  // Discard fishing trip and delete from realtime database
  const discardTrip = async () => {
    await remove(ref(database, "/fishing-trips/" + tripKey));
    navigation.navigate("Home"),
      navigation.push("Start Fishing"),
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Start Fishing" }],
        })
      );
  };

  // Save and discard button props
  const saveButtonProps = {
    title: "Save",
    onPress: () => saveTrip(),
  };
  const discardButtonProps = {
    title: "Discard activity",
    onPress: () => discardTrip(),
  };

  return (
    <View style={trackingStyles.container}>
      <StatusBar style="auto" />
      {tripData ? (
        <MapView
          style={trackingStyles.map}
          region={tripData.startLocation}
          initialRegion={tripData.startLocation}
        >
          <Marker coordinate={tripData.startLocation} title="Start">
            <Image source={StartIcon} />
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
                <Image source={FishButton} />
              </Marker>
            );
          })}
          <Marker coordinate={currentLocation} title="End">
            <Image source={EndIcon} />
          </Marker>
        </MapView>
      ) : (
        <MapView style={trackingStyles.map} />
      )}
      <View style={trackingStyles.rowContainer}>
        <View style={trackingStyles.infoContainer}>
          <InfoText label={fishCount} />
          <LabelText label="Fish caught" />
        </View>
        <View style={trackingStyles.infoContainer}>
          <InfoText label={elapsedTime} />
          <LabelText label="Duration" />
        </View>
      </View>
      <View style={trackingStyles.actionsContainer}>
        <View style={trackingStyles.buttonContainer}>
          <PrimaryButton {...saveButtonProps} />
          <SecondaryButton {...discardButtonProps} />
        </View>
      </View>
    </View>
  );
}
