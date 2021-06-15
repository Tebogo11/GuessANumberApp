import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TitleText = (props) => {
  return <Text style={styles.title}>{props.children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
    color: "#000066",
  },
});
