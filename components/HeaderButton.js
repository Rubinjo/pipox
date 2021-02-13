import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Entypo } from "@expo/vector-icons";

import COLORS from "../constants/colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Entypo}
      iconSize={23}
      color={COLORS.PrimaryColorOn}
    />
  );
};

export default CustomHeaderButton;
