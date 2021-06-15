import React from "react";
import { StyleSheet, TextInput } from "react-native";

import Color from "../neverchanging/colors";
const input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

export default input;

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: Color.primary,
    borderBottomWidth: 2,
    marginVertical: 10,
  },
});
