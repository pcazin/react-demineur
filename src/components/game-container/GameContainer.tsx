import { useState } from "react";
import { Mode } from "../../shared/enums";
import { ModeSpec } from "../../shared/types";
import DemineurNav from "../demineur-nav/DemineurNav";
import Demineur from "../demineur/Demineur";

export default function GameContainer() {

  const [isTimeRunning, setTimeRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [gameMode, setGameMode] = useState<Mode>(Mode.BEGINNER);

  const startTime = (): void => {
    setTimeRunning(current => !current);
    let timeInterval = setInterval(() => {
      if (isTimeRunning) {
        setTime(time => time + 1);
      } else {
        clearInterval(timeInterval);
      }
    }, 1000)
  };

  const stopTime = (): void => {
    setTimeRunning(current => !current);
  };

  const resetTime = (): void => {
    setTime(0);
  };

  const getModeSpec = (modeSpec: Mode): ModeSpec => {
    switch (modeSpec) {
      case Mode.BEGINNER:
        return {
          text: "Débutant",
          size: 9,
          bombs: 10
        };
      case Mode.INTERMEDIATE:
        return {
          text: "Intermédiaire",
          size: 16,
          bombs: 40
        };
      case Mode.EXPERT:
        return {
          text: "Expert",
          size: 22,
          bombs: 100
        };
      case Mode.MASTER:
        return {
          text: "Maître",
          size: 30,
          bombs: 250
        };
    }
  }

  return (
    <div id="game-container">
      <DemineurNav setMode={setGameMode} />
      <Demineur modeSpec={getModeSpec(gameMode)} startTime={startTime} stopTime={stopTime} isTimeRunning={isTimeRunning} setTimeRunning={setTimeRunning} />
    </div>
  )
}
