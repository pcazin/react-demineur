type ZeroOneArrayOfArrays = Array<Array<0 | 1>>;
type BeforeJsxArrayOfArrays = Array<Array<PreCell>>;
type PreNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type PreEmpty = null;
type PreBomb = "bomb";
type PreCell = PreEmpty | PreBomb | PreNumber;
import { ModeSpec } from "../../shared/types";
import { CellState } from "../../shared/enums";
import { Cell } from "../cell";
import { Dispatch, ReactElement } from "react";

interface Props {
  modeSpec: ModeSpec,
  revealAll: number,
  setRevealAll: Dispatch<React.SetStateAction<number>>,
  revealEmptyCellAround: { x: number, y: number },
  setRevealEmptyCellAround: Dispatch<React.SetStateAction<{ x: number, y: number }>>
}

export default function CellsGenerator({modeSpec, revealAll, setRevealAll, revealEmptyCellAround, setRevealEmptyCellAround}: Props): JSX.Element[] {

  const generateDemineur = () => {
    // je genre des tableaux de empty
    const ZeroOneArrayOfArrays: ZeroOneArrayOfArrays =
      generateZeroOneArrayOfArrays();
    // placer les bombes
    const preArrayWithBombs = insertBombs(ZeroOneArrayOfArrays);
    // générer les numéros
    const preArrayWithNumbers = calculateNumbers(preArrayWithBombs);
    // generer les Cells
    return generateJsxCells(preArrayWithNumbers);
  };

  const generateZeroOneArrayOfArrays = (): ZeroOneArrayOfArrays => {
    let ArrayOfArrays: ZeroOneArrayOfArrays = [];

    for (let i = 0; i < modeSpec.size; i++) {
      let arrayOfCells: (0 | 1)[] = [];
      for (let j = 0; j < modeSpec.size; j++) {
        arrayOfCells.push(0);
      }
      ArrayOfArrays.push(arrayOfCells);
    }
    return ArrayOfArrays;
  };

  const insertBombs = (
    arrayOfArrays: ZeroOneArrayOfArrays
  ): ZeroOneArrayOfArrays => {
    const bombsIndexs = generateBombsIndexs(
      modeSpec.bombs,
      modeSpec.size * modeSpec.size
    );

    let index = 0;
    for (let i = 0; i < arrayOfArrays.length; i++) {
      for (let j = 0; j < arrayOfArrays[i].length; j++) {
        if (bombsIndexs.includes(index)) {
          arrayOfArrays[i][j] = 1;
        }
        index++;
      }
    }
    return arrayOfArrays;
  };

  function generateBombsIndexs(n: number, max: number): number[] {
    let randoms: number[] = [];
    while (randoms.length < n) {
      let random = Math.floor(Math.random() * max);
      if (randoms.indexOf(random) === -1) {
        randoms.push(random);
      }
    }
    return randoms;
  }

  const calculateNumbers = (preArray: ZeroOneArrayOfArrays): PreCell[][] => {
    let finalArray: BeforeJsxArrayOfArrays = [];

    for (let i = 0; i < preArray.length; i++) {
      let beforeJsxArray: PreCell[] = [];

      for (let j = 0; j < preArray[i].length; j++) {
        const cell = preArray[i][j];

        if (cell === 1) {
          beforeJsxArray.push("bomb");
        }

        if (cell === 0) {
          const numberOfBoundsAround = getNumberOfBombsAround(preArray, i, j);
          if (numberOfBoundsAround === 0) {
            beforeJsxArray.push(null);
          } else {
            beforeJsxArray.push(numberOfBoundsAround as PreNumber);
          }
        }
      }
      finalArray.push(beforeJsxArray);
    }
    return finalArray;
  };

  const getNumberOfBombsAround = (
    array: ZeroOneArrayOfArrays,
    i: number,
    j: number
  ): number => {
    let total = 0;

    let cells = [
      array[i - 1] && array[i - 1][j - 1] !== undefined
        ? array[i - 1][j - 1]
        : undefined,
      array[i - 1] && array[i - 1][j] !== undefined
        ? array[i - 1][j]
        : undefined,
      array[i - 1] && array[i - 1][j + 1] !== undefined
        ? array[i - 1][j + 1]
        : undefined,
      array[i] && array[i][j - 1] !== undefined ? array[i][j - 1] : undefined,
      array[i] && array[i][j + 1] !== undefined ? array[i][j + 1] : undefined,
      array[i + 1] && array[i + 1][j - 1] !== undefined
        ? array[i + 1][j - 1]
        : undefined,
      array[i + 1] && array[i + 1][j] !== undefined
        ? array[i + 1][j]
        : undefined,
      array[i + 1] && array[i + 1][j + 1] !== undefined
        ? array[i + 1][j + 1]
        : undefined,
    ];

    for (let index of cells) {
      if (index !== undefined && index === 1) {
        total = total + 1;
      }
    }

    return total;
  };

  const generateJsxCells = (
    arrayOfArrays: PreCell[][]
  ): ReturnType<typeof Cell>[] => {
    let JsxCells: JSX.Element[] = [];

    const numbersState = [CellState.ONE, CellState.TWO, CellState.THREE, CellState.FOUR, CellState.FIVE, CellState.SIX, CellState.SEVEN, CellState.EIGHT];

    let x = 0;
    for (let array of arrayOfArrays) {
      let y = 0;
      for (let cell of array) {
        let cellState: CellState;
        switch (cell) {
          case null:
            cellState = CellState.EMPTY;
            break;
          case "bomb":
            cellState = CellState.BOMB;
            break;
          default:
            cellState = numbersState[cell - 1];
            break;
        }

        JsxCells.push(<Cell
          id={x.toString() + y.toString()}
          setRevealAll={setRevealAll}
          revealAll={revealAll}
          modeSpec={modeSpec}
          cellState={cellState}
          axes={{ x: x, y: y }}
          setRevealEmptyCellAround={setRevealEmptyCellAround}
          revealEmptyCellAround={revealEmptyCellAround}
        />)
        y++;
      }
      x++;
    }
    return JsxCells;
  };

  return generateDemineur();
}