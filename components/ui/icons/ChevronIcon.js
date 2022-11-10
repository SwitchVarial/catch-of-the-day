import Icon from "./Icon";

export default ChevronIcon = () => {
  const iconProps = {
    color: "#68C4B6",
    name: "expand-more",
    size: 36,
  };

  return (
    <Icon color={iconProps.color} size={iconProps.size} name={iconProps.name} />
  );
};
