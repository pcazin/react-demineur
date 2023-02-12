import "./style.css";
import { DemineurProps } from "../../shared/types";
import { CellState } from "../../shared/enums";
import { useEffect, useState } from "react";
import { Cell } from "../cell";

/**
 * Pour savoir si la partie est finit
 * je fais un array du nombre total de cell
 * le nombre total de cell a découvrir = nb total - nb de bombe
 * si le nombre de cell revealed = ce nombre
 * la partie est finit
 * la partie est donc perdue
 */

type ZeroOneArrayOfArrays = Array<Array<0 | 1>>;
type BeforeJsxArrayOfArrays = Array<Array<PreCell>>;
type PreNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type PreEmpty = null;
type PreBomb = "bomb";
type PreCell = PreEmpty | PreBomb | PreNumber;

export default function Demineur({
  modeSpec,
  cellsArray,
  startTime,
  stopTime,
  setTimeRunning,
}: DemineurProps) {

  return (
    <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${modeSpec.size}, 1fr)`, userSelect: "none" }}>
      
    </div>
  )
}
