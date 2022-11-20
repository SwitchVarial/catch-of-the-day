import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("No permission to get location");
    return;
  }
  let location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  const { latitude, longitude } = location.coords;
  const { accuracy } = location.coords;
  const currentLocation = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
    accuracy: accuracy,
  };
  return currentLocation;
};

export const getMunicipality = async (location) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("No permission to get location");
    return;
  }
  const { latitude, longitude } = location;
  const address = await Location.reverseGeocodeAsync({ latitude, longitude });
  const municipality = address[0].city;
  return municipality;
};
