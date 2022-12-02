import React from "react";
import { View, Image } from "react-native";
import TripHeaderTitle from "../texts/TripHeaderTitle";
import TripHeaderSubtitle from "../texts/TripHeaderSubtitle";
import MapView, { Marker } from "react-native-maps";
import FishButton from "../../../assets/FishButton.png";
import StartIcon from "../../../assets/StartIcon.png";
import EndIcon from "../../../assets/EndIcon.png";
import FishIcon from "../../../assets/FishIcon.png";
import TimeIcon from "../../../assets/TimeIcon.png";
import { renderFishigTripstyles } from "./Styles";

export const renderItem = ({ item }) => {
  const time = new Date(item.startTime).toLocaleString().substring(0, 10);
  let elapsedTime;
  if (item.elapsedTime !== undefined) {
    elapsedTime = new Date(item.elapsedTime).toISOString().slice(11, 19);
  }
  let fishCount;
  if (item.fishCount == undefined) {
    fishCount = 0;
  } else {
    fishCount = item.fishCount;
  }

  return (
    <View style={renderFishigTripstyles.tripContainer}>
      <View style={renderFishigTripstyles.tripHeaderContainer}>
        <View style={renderFishigTripstyles.rowContainer}>
          <TripHeaderTitle label="User Name" />
          <TripHeaderTitle label={item.fishingType} />
        </View>
        <View style={renderFishigTripstyles.rowContainer}>
          <TripHeaderSubtitle label={time} />
          {item.municipality ? (
            <TripHeaderSubtitle label={item.municipality} />
          ) : (
            <TripHeaderSubtitle label="No locality information" />
          )}
        </View>
      </View>
      <View style={renderFishigTripstyles.tripMapContainer}>
        <MapView
          style={renderFishigTripstyles.mapStyle}
          region={item.startLocation}
          initialRegion={item.startLocation}
          pitchEnabled={false}
          rotateEnabled={false}
          zoomEnabled={false}
          scrollEnabled={false}
        >
          {item.startLocation == undefined ? (
            <Marker coordinate={item.startLocation} title="Start">
              <Image source={StartIcon} />
            </Marker>
          ) : null}
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
      </View>
      <View style={renderFishigTripstyles.tripFooterContainer}>
        <View style={renderFishigTripstyles.rowContainer}>
          <View style={renderFishigTripstyles.rowContainer}>
            <Image source={FishIcon} style={renderFishigTripstyles.iconStyle} />
            <TripHeaderSubtitle label={fishCount + " fish caught"} />
          </View>
          <View style={renderFishigTripstyles.rowContainer}>
            <Image source={TimeIcon} style={renderFishigTripstyles.iconStyle} />
            <TripHeaderSubtitle label={elapsedTime} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const listSeparator = () => {
  return <View style={renderFishigTripstyles.separator} />;
};
