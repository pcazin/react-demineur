import "./demineur.css";
import { DemineurProps } from "../../shared/types";
import { CellState } from "../../shared/enums";
import { useEffect, useState } from "react";
import { Cell } from "../cell/Cell";

type ZeroOneArrayOfArrays = Array<Array<0 | 1>>;
type BeforeJsxArrayOfArrays = Array<Array<PreCell>>;
type PreNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type PreEmpty = null;
type PreBomb = "bomb";
type PreCell = PreEmpty | PreBomb | PreNumber;

export default function Demineur({
  modeSpec,
  startTime,
  stopTime,
  setTimeRunning,
}: DemineurProps) {
  const [revealAll, setRevealAll] = useState(0);

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

    let nullCell = 0;
    let bombCell = 0;
    let numberCell = 0;

    for (let i = 0; i < preArray.length; i++) {
      let beforeJsxArray: PreCell[] = [];

      for (let j = 0; j < preArray[i].length; j++) {
        const cell = preArray[i][j];

        if (cell === 1) {
          beforeJsxArray.push("bomb");
          bombCell++;
        }

        if (cell === 0) {
          let numberOfBoundsAround = getNumberOfBombsAround(preArray, i, j);
          if (numberOfBoundsAround === 0) {
            beforeJsxArray.push(null);
            nullCell++;
          } else {
            beforeJsxArray.push(numberOfBoundsAround as PreNumber);
            numberCell++;
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

    let index = 0;
    for (let array of arrayOfArrays) {
      for (let cell of array) {
        switch (cell) {
          case null:
            JsxCells.push(
              <Cell
                id={index}
                type="null"
                setRevealAll={setRevealAll}
                modeSpec={modeSpec}
                cellState={CellState.EMPTY}
              />
            );
            break;
          case "bomb":
            JsxCells.push(
              <Cell
                id={index}
                type="bomb"
                setRevealAll={setRevealAll}
                modeSpec={modeSpec}
                cellState={CellState.BOMB}
              />
            );
            break;
          default:
            switch (cell) {
              case 1:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.ONE}
                  />
                );
                break;
              case 2:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.TWO}
                  />
                );
                break;
              case 3:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.THREE}
                  />
                );
                break;
              case 4:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.FOUR}
                  />
                );
                break;
              case 5:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.FIVE}
                  />
                );
                break;
              case 6:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.SIX}
                  />
                );
                break;
              case 7:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.SEVEN}
                  />
                );
                break;
              case 8:
                JsxCells.push(
                  <Cell
                    id={index}
                    type="number"
                    setRevealAll={setRevealAll}
                    modeSpec={modeSpec}
                    cellState={CellState.EIGHT}
                  />
                );
                break;
              default:
                break;
            }
        }
      }
      index++;
    }

    return JsxCells;
  };

  return <>{generateDemineur()}</>;
}
