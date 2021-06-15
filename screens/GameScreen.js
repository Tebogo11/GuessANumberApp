import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  VirtualizedList,
  FlatList,
  Dimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

import Card from "../components/Card";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import { render } from "react-dom";
//outside function, does not rely on anything in side main function

//random number genrator
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

//For Scroll View
// const renderListItem = (value, numberOfRound) => (
//   <View style={styles.listItem} key={value}>
//     <BodyText>#{numberOfRound}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );

//For FlatList
const renderListItem = (listlenght, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listlenght - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initValue = generateRandomBetween(1, 100, props.userChoice);
  // initValue wont be set again because react will detect that we already have a state
  const [currentGuess, setcurrentGuess] = useState(initValue);
  // const [rounds, setrounds] = useState(0);
  const [pastguess, setpastguess] = useState([initValue.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastguess.length);
    }
  });

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "You Know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setcurrentGuess(nextNumber);
    // setrounds((currRnds) => currRnds + 1);
    setpastguess((curPassGuess) => [nextNumber.toString(), ...curPassGuess]);
  };

  //Allowing device to choose a style based on their dimesons
  let listContainerStyle = styles.listContainer;

  if (Dimensions.get("window").width < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  return (
    <View style={styles.screen}>
      <NumberContainer>
        <TitleText>Opponents Guess</TitleText>
        <Text style={styles.currentGuess}>{currentGuess}</Text>
      </NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="orange" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="orange" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastguess.map((guess, index) =>
            renderListItem(guess, pastguess.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastguess}
          contentContainerStyle={styles.list}
          renderItem={renderListItem.bind(this, pastguess.length)}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "90%",
  },
  currentGuess: {
    color: "#000066",
    fontSize: 100,
  },
  listItem: {
    borderColor: "#000066",
    borderWidth: 2,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "space-around",
    width: " 100%",
  },
  listContainer: {
    flex: 1,
    width: "50%",
  },
  listContainerBig: {
    flex: 1,
    width: "60%",
  },
  list: {
    // alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
