import { StyleSheet } from "react-native";

export const primaryButtonStyles = StyleSheet.create({
  buttonStyle: {
    minWidth: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  buttonTitle: {
    marginHorizontal: 5,
    color: "#0B3553",
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    textTransform: "uppercase",
    fontSize: 22,
  },
  buttonContainerStyle: {
    margin: 5,
    borderRadius: 40,
  },
  buttonDisabledStyle: {
    backgroundColor: "#98732D",
  },
  buttonDisabledTitleStyle: {
    color: "#0B3553",
  },
});

export const secondaryButtonStyles = StyleSheet.create({
  buttonStyle: {
    minWidth: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    marginHorizontal: 5,
    color: "#68C4B6",
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    textTransform: "uppercase",
    fontSize: 22,
  },
  buttonContainerStyle: {
    margin: 5,
    borderRadius: 40,
    borderColor: "#68C4B6",
    borderWidth: 2,
  },
});
