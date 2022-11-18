import { StyleSheet } from "react-native";

export const trackingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#174667",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 15,
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stopwatchContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    flex: 2,
    width: "100%",
  },
  actionsContainer: {
    backgroundColor: "#174667",
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
});

export const stopwatchOptions = {
  container: {
    padding: 0,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "#68C4B6",
    marginLeft: 7,
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    textTransform: "uppercase",
    fontSize: 28,
  },
};