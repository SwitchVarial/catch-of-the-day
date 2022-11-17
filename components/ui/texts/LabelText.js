import Text from "./Text";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { StyleSheet } from "react-native";

export default LabelText = (props) => {
  const textProps = {
    style: styles.textStyle,
    label: props.label,
  };
  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_800ExtraBold,
  });

  if (!fontsLoaded) {
    return;
  } else {
    return <Text {...textProps} />;
  }
};

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    fontSize: 14,
  },
});
