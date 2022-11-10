import Button from "./Button";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { StyleSheet } from "react-native";

export default SecondaryButton = (props) => {
  const buttonProps = {
    title: props.title,
    type: "solid",
    color: "#174667",
    buttonStyle: styles.buttonStyle,
    containerStyle: styles.buttonContainerStyle,
    titleStyle: styles.buttonTitle,
    onPress: props.onPress,
  };

  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_800ExtraBold,
  });

  if (!fontsLoaded) {
    return;
  } else {
    return <Button {...buttonProps} />;
  }
};

const styles = StyleSheet.create({
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
    borderRadius: 100,
    borderColor: "#68C4B6",
    borderWidth: 2,
  },
});
