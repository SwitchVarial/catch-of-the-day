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

export const homeProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#174667",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  listHeaderContainer: {
    width: "100%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listFooterContainer: {
    width: "100%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 85,
    paddingHorizontal: 20,
  },
  listContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  list: {
    width: "100%",
    marginTop: 15,
  },
  rowContainer: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fishIcon: {
    marginBottom: 5,
  },
  homeInfoRow: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
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
