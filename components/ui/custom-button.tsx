import React from "react";
import { Button, ButtonProps } from "react-native-paper";

const CustomButton = (props: ButtonProps) => {
  const { style, ...rest } = props;
  return (
    <Button
      {...rest}
      style={{
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 5,
        width: "100%",
      }}
      mode={props.mode || "contained"}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
