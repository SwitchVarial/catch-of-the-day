import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import StartFishing from "../../screens/StartFishing";
import Icon from "../icons/Icon";

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarStyle: {
    paddingTop: 0,
    backgroundColor: "#0B3553",
    position: "absolute",
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarActiveTintColor: "#68C4B6",
  tabBarInactiveTintColor: "#68C4B6",
  tabBarIcon: ({ color, size, containerStyle, iconStyle }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = "home";
      size = 40;
    } else if (route.name === "StartFishing") {
      iconName = "add-circle";
      size = 55;
      color = "#FFA700";
      containerStyle = {
        height: 65,
        top: -10,
        borderWidth: 10,
        borderRadius: 100,
        borderColor: "#0B3553",
        backgroundColor: "#0B3553",
      };
      iconStyle = { margin: -5 };
    } else if (route.name === "Profile") {
      iconName = "person";
      size = 40;
    }

    return (
      <Icon
        name={iconName}
        size={size}
        color={color}
        containerStyle={containerStyle}
        iconStyle={iconStyle}
      />
    );
  },
});

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function FishingStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start Fishing"
        component={StartFishing}
        options={{
          headerStyle: {
            backgroundColor: "#0B3553",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#68C4B6",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function BottomNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          options={{ tabBarLabelStyle: { color: "white" } }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: { color: "white" },
            title: "Start Fishing",
          }}
          name="StartFishing"
          component={FishingStackScreen}
        />
        <Tab.Screen
          options={{ tabBarLabelStyle: { color: "white" } }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
