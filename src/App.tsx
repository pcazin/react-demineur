import React, { createContext, useEffect, useState } from "react";
import Demineur from "./components/game-container/GameContainer";
import { GameResultType } from "./shared/types";
import { DataContextType } from "./shared/interfaces";
import "./App.css";
import GameContainer from "./components/game-container/GameContainer";

function App() {

  const DataContext = createContext<DataContextType>({
    addGameResult: (newResult: GameResultType) => {},
    gameResults: []
  });
  const [gameResults, setGameResultsValue] = useState<GameResultType[]>([]);
  const localStorageGameResultsKey = "game-results";

  useEffect(() => {
    AppLoadStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageGameResultsKey, JSON.stringify(gameResults));
  }, [gameResults]);

  const AppLoadStorage = (): void => {
    const newValue = localStorage.getItem("game-results")
    if (newValue) {
      setGameResultsValue(JSON.parse(newValue));
    } else {
      localStorage.setItem("game-results", JSON.stringify([]));
    }
  };

  const addGameResult = (newResult: GameResultType): void => {
    setGameResultsValue(gameResultsValue => [...gameResultsValue, newResult]);
    localStorage.setItem("game-results", JSON.stringify(gameResults));
  }

  return (
    <DataContext.Provider value={{ gameResults, addGameResult }}>
      <GameContainer />
    </DataContext.Provider>
  )

}

export default App;
