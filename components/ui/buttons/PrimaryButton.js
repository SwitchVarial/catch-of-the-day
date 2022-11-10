import Button from "./Button";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { StyleSheet } from "react-native";

export default PrimaryButton = (props) => {
  const buttonProps = {
    title: props.title,
    type: "solid",
    color: "#FFA700",
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
    color: "#0B3553",
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    textTransform: "uppercase",
    fontSize: 22,
  },
  buttonContainerStyle: {
    margin: 5,
    borderRadius: 40,
    borderColor: "#FFA700",
    borderWidth: 2,
  },
});
