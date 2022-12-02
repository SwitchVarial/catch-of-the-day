import Text from "./Text";
import {
  useFonts,
  MPLUSRounded1c_500Medium,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { tripHeaderSubtitleStyles } from "./Styles";

export default TripHeaderSubtitle = (props) => {
  const textProps = {
    style: tripHeaderSubtitleStyles.textStyle,
    label: props.label,
  };

  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_500Medium,
  });

  if (!fontsLoaded) {
    return;
  } else {
    return <Text {...textProps} />;
  }
};
