import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#000066",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "orange",
    fontSize: 21,
    fontFamily: "open-sans-bold",
  },
});
