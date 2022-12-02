import Text from "./Text";
import {
  useFonts,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { tripHeaderTitleStyles } from "./Styles";

export default TripHeaderTitle = (props) => {
  const textProps = {
    style: tripHeaderTitleStyles.textStyle,
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
