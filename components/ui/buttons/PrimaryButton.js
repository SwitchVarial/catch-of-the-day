import Button from "./Button";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { primaryButtonStyles } from "./Styles";

export default PrimaryButton = (props) => {
  const buttonProps = {
    title: props.title,
    type: "solid",
    color: "#FFA700",
    buttonStyle: primaryButtonStyles.buttonStyle,
    containerStyle: primaryButtonStyles.buttonContainerStyle,
    titleStyle: primaryButtonStyles.buttonTitle,
    onPress: props.onPress,
    disabled: props.disabled,
    disabledStyle: primaryButtonStyles.buttonDisabledStyle,
    disabledTitleStyle: primaryButtonStyles.buttonDisabledTitleStyle,
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
