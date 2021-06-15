import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over - Youve being beat</TitleText>
      <View style={styles.imageCon}>
        <Image
          // source={require("../assets/success.png")}
          source={{
            uri:
              "https://www.pandotrip.com/wp-content/uploads/2018/03/Ushguli-village-at-the-foot-of-Mount-Shkhara.-Upper-Svaneti-Georgia-Europe.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <BodyText style={styles.text}>
        Your phone needed{" "}
        <Text style={styles.hightlight1}>{props.numberOfRnd}</Text> rounds to
        guess the number
        <Text style={styles.hightlight1}> {props.userChoice} </Text>
      </BodyText>
      <MainButton onPress={props.onRestGame}>NEW GAME</MainButton>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageCon: {
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
  },
  hightlight1: {
    color: "#000066",
    fontFamily: "open-sans-bold",
  },
  text: {
    margin: 10,
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
});
