import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Color from "../neverchanging/colors";
import Input from "../components/input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import Titletext from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  //State
  const [enteredValue, setEnteredValue] = useState("");
  const [selectedNumber, setselectedNumber] = useState();
  const [hasUserComfirmed, setComfirmed] = useState(false);
  const [buttonWidth, setbuttonWidth] = useState(
    Dimensions.get("window").width / 3
  );
  //Methods

  const updateLayout = () => {
    setbuttonWidth(Dimensions.get("window").width / 3);
  };
  Dimensions.addEventListener("change", updateLayout);

  const enteredInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setComfirmed(false);
  };

  const confirmHandler = () => {
    const chooseNumber = parseInt(enteredValue);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return console.log("Failed"); //Do nothing
    }
    setComfirmed(true);
    setEnteredValue("");
    setselectedNumber(chooseNumber);
  };

  let confirmedOutput;

  //If you dont want texts to have any affect until its called
  if (hasUserComfirmed) {
    confirmedOutput = (
      <NumberContainer style={styles.NumberContainer}>
        <Text style={styles.enteredValueTitle}>You Selected</Text>
        <Text style={styles.enteredValue}>{selectedNumber}</Text>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </NumberContainer>
    );
  } else {
    confirmedOutput = (
      <View style={styles.imageCon}>
        <Image
          // source={require("../assets/success.png")}
          source={{
            uri: "https://f4.bcbits.com/img/a2217017943_16.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }

  //Return Function
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Titletext> Start a New Game!</Titletext>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.inputStyle}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={enteredInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttons}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color="black"
                    color={Color.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Comfirm"
                    onPress={confirmHandler}
                    color="white"
                    color={Color.primary}
                  />
                </View>
              </View>
            </Card>
          </KeyboardAvoidingView>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    paddingHorizontal: 5,
  },
  button: {
    // width: 100,
    width: Dimensions.get("window").width / 3,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: 300,
    // maxWidth: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  inputStyle: {
    width: 100,
    textAlign: "center",
  },
  NumberContainer: {
    width: "80%",
    marginBottom: 10,
  },
  enteredValueTitle: {
    fontSize: 30,
    color: Color.primary,
  },
  enteredValue: {
    margin: 10,
    fontSize: 80,
    color: Color.primary,
  },
  text: {
    fontFamily: "open-sans",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageCon: {
    flex: 1,
    marginTop: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 200,
    overflow: "hidden",
  },
});
