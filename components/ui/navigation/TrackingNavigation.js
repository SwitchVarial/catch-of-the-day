import React from "react";
import {
  useFonts,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartFishing from "../../screens/StartFishing";

const Stack = createNativeStackNavigator();

export default function TrackingNavigation({ navigation }) {
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
          name="Start Fishing"
          component={StartFishing}
          options={{
            headerStyle: {
              backgroundColor: "#0B3553",
            },
            title: "START FISHING",
            headerTitleStyle: {
              color: "#68C4B6",
              fontFamily: "MPLUSRounded1c_800ExtraBold",
              fontSize: 20,
            },
            headerLeft: () => (
              <Text
                onPress={() => navigation.goBack()}
                style={styles.cancelButton}
              >
                Cancel
              </Text>
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  cancelButton: {
    color: "#68C4B6",
    fontFamily: "MPLUSRounded1c_500Medium",
    fontSize: 14,
  },
});
