// nombre de clicks
// temps
// niveau de difficulté
// score (pourcentage de la grille dévérrouillée)

export enum Difficulty {
  EASY, 
  NORMAL, 
  EXPERT
}

export type GameResultType = {
  score: number;
  time: number;
  level: Difficulty;
  click: number;
};



