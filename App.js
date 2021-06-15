import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import AppLoading from "expo-app-loading";

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  pagetitle = "Guess The Number?";

  const [userNumber, setuserNumber] = useState();
  const [guessRounds, setguessRounds] = useState(0);
  const [dataload, setdataload] = useState(false);

  if (!dataload) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setdataload(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setguessRounds(0);
    setuserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setuserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfrounds) => {
    setguessRounds(numOfrounds);
  };

  let content = (
    <StartGameScreen title={pagetitle} onStartGame={startGameHandler} />
  );

  //using if statements to determine which page will be displayed
  //if a number was choosen then...
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        onRestGame={configureNewGameHandler}
        numberOfRnd={guessRounds}
        userChoice={userNumber}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={pagetitle} />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
});
