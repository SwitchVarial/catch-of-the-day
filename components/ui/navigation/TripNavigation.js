import React from "react";
import {
  useFonts,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Trip from "../../screens/Trip";

const Stack = createNativeStackNavigator();

export default function TripNavigation({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_800ExtraBold,
  });
  if (!fontsLoaded) {
    return;
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Trip Details"
          component={Trip}
          options={{
            headerStyle: {
              backgroundColor: "#0B3553",
            },
            title: "TRIP DETAILS",
            headerTitleStyle: {
              color: "#68C4B6",
              fontFamily: "MPLUSRounded1c_800ExtraBold",
              fontSize: 20,
              textTransform: "uppercase",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Text
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                Back
              </Text>
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    color: "#68C4B6",
    fontFamily: "MPLUSRounded1c_500Medium",
    fontSize: 14,
  },
});
