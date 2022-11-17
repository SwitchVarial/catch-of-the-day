import { Text as ElText } from "@rneui/themed";

const Text = (props) => {
  return <ElText {...props}>{props.label}</ElText>;
};

export default Text;
