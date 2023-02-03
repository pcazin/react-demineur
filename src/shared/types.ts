import { Dispatch } from "react";
import { CellState, Mode } from "./enums";

export type GameResultType = {
  score: number;
  time: number;
  level: Mode;
  click: number;
};

export type ModeSpec = {
  text: string,
  size: number,
  bombs: number
}

export type DemineurProps = {
  modeSpec: ModeSpec,
  startTime: () => void,
  stopTime: () => void,
  isTimeRunning: boolean,
  setTimeRunning: Dispatch<React.SetStateAction<boolean>>
}





