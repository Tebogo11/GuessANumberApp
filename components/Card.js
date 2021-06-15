import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: 300,
    fontSize: 20,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "#000066",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 0.26,
    backgroundColor: "orange",
    padding: 20,
    borderRadius: 10,
  },
});
