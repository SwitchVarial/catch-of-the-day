import Button from "./Button";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { secondaryButtonStyles } from "./Styles";

export default SecondaryButton = (props) => {
  const buttonProps = {
    title: props.title,
    type: "solid",
    color: "#174667",
    buttonStyle: secondaryButtonStyles.buttonStyle,
    containerStyle: secondaryButtonStyles.buttonContainerStyle,
    titleStyle: secondaryButtonStyles.buttonTitle,
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
