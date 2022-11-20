import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, View, Image } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { database } from "../utils/FireBaseConfig";
import { ref, onValue } from "firebase/database";
import { homeProfileStyles } from "./Styles";
import { renderItem, listSeparator } from "../ui/map/RenderFishingTrips";
import InfoText from "../ui/texts/InfoText";
import FishIcon from "../../assets/FishIcon.png";
import TimeIcon from "../../assets/TimeIcon.png";

export default function HomeScreen({ navigation }) {
  // All needed useStates
  const [tripsData, setTripsData] = useState([]);

  // Props for start button
  const startButtonProps = {
    title: "Start Fishing",
    onPress: () => navigation.navigate("StartFishing"),
  };

  // Use effect get fishing trip data from realtime database
  useEffect(() => {
    const itemsRef = ref(database, "/fishing-trips");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const fishingTrips = data
        ? Object.keys(data)
            .map((key) => ({ key, ...data[key] }))
            .reverse()
        : [];
      setTripsData(fishingTrips);
    });
  }, []);

  // Total fish count
  const fishCount = tripsData.reduce((accumulator, object) => {
    let count;
    if (object.fishCount == undefined) {
      count = 0;
    } else {
      count = object.fishCount;
    }
    return accumulator + count;
  }, 0);

  // Total elapsed time
  const elapsedTimeMilli = tripsData.reduce((accumulator, object) => {
    if (object.elapsedTime !== undefined) {
      const milliSeconds = accumulator + object.elapsedTime;
      return milliSeconds;
    } else {
      return 0;
    }
  }, 0);
  const elapsedTime = new Date(elapsedTimeMilli).toISOString().slice(11, 19);

  // List header
  const ListHeader = () => (
    <View style={homeProfileStyles.listHeaderContainer}>
      <View style={homeProfileStyles.rowContainer}>
        <View style={homeProfileStyles.homeInfoRow}>
          <Image source={FishIcon} style={homeProfileStyles.fishIcon} />
          <InfoText label={fishCount} />
          <LabelText label="Fish caught" />
        </View>
        <View style={homeProfileStyles.homeInfoRow}>
          <Image source={TimeIcon} style={homeProfileStyles.fishIcon} />
          <InfoText label={elapsedTime} />
          <LabelText label="Hours spent fishing" />
        </View>
      </View>
      <PrimaryButton {...startButtonProps} />
    </View>
  );

  // List footer
  const ListFooter = () => (
    <View style={homeProfileStyles.listFooterContainer}>
      <InfoText label="You have reached the bottom. Great fish do not swim in shallow waters." />
    </View>
  );

  return (
    <View style={homeProfileStyles.container}>
      <StatusBar style="auto" />
      <View style={homeProfileStyles.listContainer}>
        <FlatList
          style={homeProfileStyles.list}
          data={tripsData}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
    </View>
  );
}
