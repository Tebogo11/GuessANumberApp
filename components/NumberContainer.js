import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Color from "../neverchanging/colors";
const NumberContainer = (props) => {
  return (
    <View style={{ ...styles.NumberContainer, ...props.style }}>
      {props.children}
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
  NumberContainer: {
    marginTop: 20,
    alignItems: "center",
    borderColor: Color.primary,
    borderWidth: 3,
    padding: 10,
    borderRadius: 20,
  },
});
