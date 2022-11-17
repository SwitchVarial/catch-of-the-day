import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FishButton from "../../assets/FishButton.png";
import StartIcon from "../../assets/StartIcon.png";
import EndIcon from "../../assets/EndIcon.png";

export default function SaveFishing({ navigation, route }) {
  const { tripData, fishData, fishCount, currentLocation } = route.params;
  const endTime = Date.now();
  const elapsedTime = new Date(endTime - tripData.startTime)
    .toISOString()
    .slice(11, 19);
  const primaryButtonProps = {
    title: "Save",
    onPress: () => addFish(),
  };

  const secondaryButtonProps = {
    title: "Discard activity",
    onPress: () => stopTracking(),
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        region={tripData.startLocation}
        initialRegion={tripData.startLocation}
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
        <Marker coordinate={currentLocation} title="End">
          <Image source={EndIcon} style={{ height: 20, width: 20 }} />
        </Marker>
      </MapView>
      <View style={styles.rowContainer}>
        <View style={styles.infoContainer}>
          <InfoText label={fishCount} />
          <LabelText label="Fish caught" />
        </View>
        <View style={styles.infoContainer}>
          <InfoText label={elapsedTime} />
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
