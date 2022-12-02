import { StyleSheet } from "react-native";

export const renderFishigTripstyles = StyleSheet.create({
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
