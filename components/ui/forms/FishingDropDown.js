import DropDown from "./DropDown";
import {
  useFonts,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { View } from "react-native";
import ChevronIcon from "../icons/ChevronIcon";
import { dropdownStyles } from "./Styles";

export default FishingDropDown = (props) => {
  const dropdownProps = {
    onSelect: props.onSelect,
    setSelected: props.setSelected,
    data: props.data,
  };

  let [fontsLoaded] = useFonts({
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_800ExtraBold,
  });

  if (!fontsLoaded) {
    return;
  } else {
    return (
      <View style={{ width: "90%" }}>
        <DropDown
          {...dropdownProps}
          maxHeight="300"
          placeholder="Fishing type"
          search={false}
          arrowicon={<ChevronIcon />}
          boxStyles={dropdownStyles.boxStyle}
          inputStyles={dropdownStyles.inputStyle}
          dropdownStyles={dropdownStyles.dropdownStyle}
          dropdownTextStyles={dropdownStyles.dropdownTextStyle}
        />
      </View>
    );
  }
};
