import { Marker } from "react-native-maps";
import { FishIcon } from "../icons/FishIcon";

export const renderFishMarkers = ({ item }) => (
  <Marker
    coordinate={item.catchLocation}
    title={item.catchTime}
    icon={<FishIcon />}
  />
);
