import "./demineur.css";
import { DemineurProps } from "../../shared/types";
import { useEffect } from "react";


type ZeroOneArrayOfArrays = Array<Array<0 | 1>>;
type BeforeJsxArrayOfArrays = Array<Array<PreCell>>
type PreNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type PreEmpty = null;
type PreBomb = "bomb";
type PreCell = PreEmpty | PreBomb | PreNumber

export default function Demineur({ modeSpec, startTime, stopTime, setTimeRunning }: DemineurProps) {

  useEffect(() => {
    generateDemineur();
  }, [])

  const generateDemineur = () => {
    // je genre des tableaux de empty
     const ZeroOneArrayOfArrays: ZeroOneArrayOfArrays = generateZeroOneArrayOfArrays();
    // placer les bombes
    const preArrayWithBombs = insertBombs(ZeroOneArrayOfArrays);
    // générer les numéros
    const preArrayWithNumbers = calculateNumbers(preArrayWithBombs);
    // const cellsJSX = generateCellsJSX(preArrayWithNumbers);

  };

  const generateZeroOneArrayOfArrays = (): ZeroOneArrayOfArrays => {
    let ArrayOfArrays: ZeroOneArrayOfArrays = [];

    for (let i = 0; i < modeSpec.size; i++) {
      let arrayOfCells: (0 | 1)[] = []
      for (let j = 0; j < modeSpec.size; j++) {
        arrayOfCells.push(0);
      }
      ArrayOfArrays.push(arrayOfCells);
    }
    return ArrayOfArrays;
  };

  const insertBombs = (arrayOfArrays: ZeroOneArrayOfArrays): ZeroOneArrayOfArrays => {;

    const bombsIndexs = generateBombsIndexs(modeSpec.bombs, modeSpec.size * modeSpec.size);

    let index = 0;
    for(let i = 0; i < arrayOfArrays.length; i++) {
      for(let j = 0; j < arrayOfArrays[i].length; j++) {
        if(bombsIndexs.includes(index)) {
          arrayOfArrays[i][j] = 1;
        } 
        index++;
      }
    }
    return arrayOfArrays;
  }

  function generateBombsIndexs(n: number, max: number): number[] {
    let randoms: number[] = [];
    while(randoms.length < n) {
        let random = Math.floor(Math.random() * max);
        if(randoms.indexOf(random) === -1) {
            randoms.push(random);
        }
    }
    return randoms;
}

  const calculateNumbers = (preArray: ZeroOneArrayOfArrays): PreCell[][] => {

    let finalArray: BeforeJsxArrayOfArrays = []
    let nullCell = 0;
    let bombCell = 0;
    let numberCell = 0;

    for(let i = 0; i < preArray.length; i++) {

      let beforeJsxArray: PreCell[] = []

      for(let j = 0; j < preArray[i].length; j++) {

        const cell = preArray[i][j];

        if(cell === 1) {
          beforeJsxArray.push("bomb")
          bombCell++;
        }

        if(cell === 0) {
          
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

    /* console.log("number: " + numberCell);
    console.log("null: " + nullCell);
    console.log("bomb: " + bombCell); */
    
    return finalArray;
  }


  const getNumberOfBombsAround = (array: ZeroOneArrayOfArrays, i: number, j: number): number => {

    let total = 0;

    console.log("i: " + i)
    console.log("j: " + j)
    console.log("array: " + array[0]);
    


    let cells = [
      array[i - 1] && array[i - 1][j - 1] !== undefined ? array[i - 1][j - 1] : undefined,
      array[i - 1] && array[i - 1][j] !== undefined ? array[i - 1][j] : undefined,
      array[i - 1] && array[i - 1][j + 1] !== undefined ? array[i - 1][j + 1] : undefined,
      array[i] && array[i][j - 1] !== undefined ? array[i][j - 1] : undefined,
      array[i] && array[i][j + 1] !== undefined ? array[i][j + 1] : undefined,
      array[i + 1] && array[i + 1][j - 1] !== undefined ? array[i + 1][j - 1] : undefined,
      array[i + 1] && array[i + 1][j] !== undefined ? array[i + 1][j] : undefined,
      array[i + 1] && array[i + 1][j + 1] !== undefined ? array[i + 1][j + 1] : undefined
    ]

    for(let index of cells) {
      if( index !== undefined) {
        total = total + 1
      }
    }

    return total;
  }

  return (
      <p>coucou</p>

  )
}





