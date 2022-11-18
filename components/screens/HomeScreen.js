import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { database } from "../utils/FireBaseConfig";
import { ref, onValue } from "firebase/database";
import { homeProfileStyles } from "./Styles";
import { ListItem } from "@rneui/base";

export default function HomeScreen({ navigation }) {
  // All needed useStates
  const [tripsData, setTripsData] = useState([]);

  // Props for start button
  const startButtonProps = {
    title: "Start Fishing",
    onPress: () => navigation.navigate("StartFishing"),
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <View>
          <ListItem.Title>{item.fishingType}</ListItem.Title>
        </View>
      </ListItem.Content>
    </ListItem>
  );

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
          nestedScrollEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: 2000,
    marginTop: 20,
  },
});
