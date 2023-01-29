import { GameResultType } from "./types";

export interface DataContextType {
  addGameResult: (newResult: GameResultType) => void,
  gameResults: GameResultType[]
}