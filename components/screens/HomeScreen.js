import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View, Text, Image } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { database } from "../utils/FireBaseConfig";
import { ref, onValue } from "firebase/database";
import { homeProfileStyles } from "./Styles";
import TripHeaderTitle from "../ui/texts/TripHeaderTitle";
import TripHeaderSubtitle from "../ui/texts/TripHeaderSubtitle";
import MapView, { Marker } from "react-native-maps";
import FishButton from "../../assets/FishButton.png";
import StartIcon from "../../assets/StartIcon.png";
import EndIcon from "../../assets/EndIcon.png";
import FishIcon from "../../assets/FishIcon.png";

export default function HomeScreen({ navigation }) {
  // All needed useStates
  const [tripsData, setTripsData] = useState([]);

  // Props for start button
  const startButtonProps = {
    title: "Start Fishing",
    onPress: () => navigation.navigate("StartFishing"),
  };

  const listSeparator = () => {
    return <View style={styles.separator} />;
  };

  const renderItem = ({ item }) => {
    const time = new Date(item.startTime).toLocaleString().substring(0, 10);
    return (
      <View style={styles.tripContainer}>
        <View style={styles.tripHeaderContainer}>
          <View style={styles.rowContainer}>
            <TripHeaderTitle label="User Name" />
            <TripHeaderTitle label={item.fishingType} />
          </View>
          <View style={styles.rowContainer}>
            <TripHeaderSubtitle label={time} />
            <TripHeaderSubtitle label="Location" />
          </View>
        </View>
        <View style={styles.tripMapContainer}>
          <MapView
            style={styles.mapStyle}
            region={item.startLocation}
            initialRegion={item.startLocation}
            pitchEnabled={false}
            rotateEnabled={false}
            zoomEnabled={false}
            scrollEnabled={false}
          >
            {item.startLocation !== undefined ? (
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
              <Marker coordinate={item.endLocation} title="Start">
                <Image source={EndIcon} />
              </Marker>
            ) : null}
          </MapView>
        </View>
        <View style={styles.tripFooterContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <Image source={FishIcon} style={styles.iconStyle} />
              <TripHeaderSubtitle label={item.fishCount + " catches"} />
            </View>
            <TripHeaderSubtitle label={item.elapsedTime} />
          </View>
        </View>
      </View>
    );
  };

  // Use effect get fishing trip data from realtime database
  useEffect(() => {
    const itemsRef = ref(database, "/fishing-trips");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const fishingTrips = data
        ? Object.keys(data).map((key) => ({ key, ...data[key] }))
        : [];
      setTripsData(fishingTrips);
    });
  }, []);

  return (
    <View style={homeProfileStyles.container}>
      <StatusBar style="auto" />
      <View style={homeProfileStyles.actionsContainer}>
        <PrimaryButton {...startButtonProps} />
      </View>
      <View style={homeProfileStyles.listContainer}>
        <FlatList
          style={styles.list}
          data={tripsData}
          renderItem={renderItem}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  },
  list: {
    width: "100%",
    marginBottom: 65,
    marginTop: 15,
  },
  separator: {
    height: 15,
    width: "100%",
    backgroundColor: "#174667",
  },
  tripContainer: {
    width: "100%",
    height: 340,
    backgroundColor: "#0B3553",
  },
  tripHeaderContainer: {
    width: "100%",
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rowContainer: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 16,
    color: "white",
  },
  tripMapContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "grey",
  },
  tripFooterContainer: {
    width: "100%",
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  mapStyle: {
    width: "100%",
    height: 240,
  },
});
