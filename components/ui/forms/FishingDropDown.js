import DropDown from "./DropDown";
import {
  useFonts,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";
import { View } from "react-native";
import ChevronIcon from "../icons/ChevronIcon";

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
          search={false}
          arrowicon={<ChevronIcon />}
          boxStyles={{
            margin: 5,
            borderRadius: 40,
            borderColor: "#68C4B6",
            borderWidth: 2,
          }}
          inputStyles={{
            marginHorizontal: 5,
            color: "#68C4B6",
            fontFamily: "MPLUSRounded1c_800ExtraBold",
            textTransform: "uppercase",
            fontSize: 22,
          }}
          dropdownStyles={{
            margin: 5,
            marginTop: 5,
            borderRadius: 40,
            borderColor: "#68C4B6",
            borderWidth: 2,
          }}
          dropdownTextStyles={{
            color: "#68C4B6",
            fontFamily: "MPLUSRounded1c_500Medium",
            fontSize: 18,
          }}
          maxHeight="300"
          placeHolder="Select fishing type"
        />
      </View>
    );
  }
};
