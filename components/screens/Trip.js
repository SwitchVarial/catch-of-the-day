import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FishButton from "../../assets/FishButton.png";
import StartIcon from "../../assets/StartIcon.png";
import EndIcon from "../../assets/EndIcon.png";
import { sharedScreenStyles, homeProfileStyles } from "./Styles";
import FishIcon from "../../assets/FishIcon.png";
import TimeIcon from "../../assets/TimeIcon.png";

export default function Trip({ route }) {
  const { item } = route.params;
  let elapsedTime;
  if (item.elapsedTime !== undefined) {
    elapsedTime = new Date(item.elapsedTime).toISOString().slice(11, 19);
  } else {
    elapsedTime = "Unknown";
  }
  return (
    <View style={sharedScreenStyles.container}>
      <StatusBar style="light" />
      {item ? (
        <MapView
          style={sharedScreenStyles.map}
          region={item.startLocation}
          initialRegion={item.startLocation}
        >
          <Marker coordinate={item.startLocation} title="Start">
            <Image source={StartIcon} />
          </Marker>
          {item.fish
            ? Object.keys(item.fish)
                .map((key) => ({ key, ...item.fish[key] }))
                .map((value, index) => {
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
          {item.endLocation !== undefined ? (
            <Marker coordinate={item.endLocation} title="End">
              <Image source={EndIcon} />
            </Marker>
          ) : null}
        </MapView>
      ) : (
        <MapView style={sharedScreenStyles.map} />
      )}
      <View style={sharedScreenStyles.infoAreaContainer}>
        <View style={sharedScreenStyles.rowContainer}>
          <View style={sharedScreenStyles.infoContainer}>
            {item.fishingType ? (
              <InfoText label={item.fishingType} />
            ) : (
              <InfoText label="Unknown" />
            )}
            <LabelText label="Fishing type" />
          </View>
        </View>
        <View style={sharedScreenStyles.rowContainer}>
          <View style={sharedScreenStyles.infoContainer}>
            <View style={sharedScreenStyles.iconContainer}>
              <Image source={FishIcon} style={sharedScreenStyles.icon} />
            </View>
            {item.fishCount ? (
              <InfoText label={item.fishCount} />
            ) : (
              <InfoText label="Unknown" />
            )}
            <LabelText label="Fish caught" />
          </View>
          <View style={sharedScreenStyles.infoContainer}>
            <View style={sharedScreenStyles.iconContainer}>
              <Image source={TimeIcon} style={homeProfileStyles.icon} />
            </View>
            <InfoText label={elapsedTime} />
            <LabelText label="Duration" />
          </View>
        </View>
      </View>
    </View>
  );
}
