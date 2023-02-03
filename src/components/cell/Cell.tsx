import { Dispatch, useEffect, useState } from "react"
import { CellState } from "../../shared/enums";
import DefaultCell from "../../assets/cell/unopened.png";
import Empty from "../../assets/cell/empty.png";
import Bomb from "../../assets/cell/redBomb.jpg";
import One from "../../assets/cell/one.png";
import Two from "../../assets/cell/two.png";
import Three from "../../assets/cell/three.png";
import Four from "../../assets/cell/four.png";
import Five from "../../assets/cell/five.png";
import Six from "../../assets/cell/six.png";
import Seven from "../../assets/cell/seven.png";
import Eight from "../../assets/cell/eight.png";
import { ModeSpec } from "../../shared/types";

interface ICell {
  type: "null" | "bomb" | "number",
  id: number,
  modeSpec: ModeSpec,
  setRevealAll: Dispatch<React.SetStateAction<number>>,
  cellState: CellState
}

export function Cell({type, id, modeSpec, setRevealAll, cellState} : ICell) {

  const [image, setImage] = useState(DefaultCell)
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    if(!isRevealed) {
      setIsRevealed(revealed => !revealed);
      reveal();
    }
  }

  const handleMouseEnter = () => {
    if(!isRevealed) {
      setImage(Empty)
    }
  }

  const handlenMouseLeave = () => {
    if(!isRevealed) {
      setImage(DefaultCell)
    }
  }

  const revealAll = () => {
    setRevealAll(val => val + 1);
  }

  const reveal = () => {
    if(!isRevealed) {
      switch(cellState) {
        case "empty":
          setImage(Empty)
          break;
        case "bomb":
          setImage(Bomb)
          setRevealAll(old => old + 1)
          break;
        case "one":
          setImage(One)
          break;
        case "two":
          setImage(Two)
          break;
        case "three":
          setImage(Three)
          break;
        case "four":
          setImage(Four)
          break;
        case "five":
          setImage(Five)
          break;
        case "six":
          setImage(Six)
          break;
        case "seven":
          setImage(Seven)
          break;
        case "eight":
          setImage(Eight)
          break;
        default:
          throw new Error("erreur switch cellState");
      }
    }
  }

  return (
    <img
      key={id.toString()}
        onClick={handleClick}
          onMouseEnter={handleMouseEnter}
            onMouseLeave={handlenMouseLeave}
              src={image}
                alt="cell"
                style={{width: "100px" }}
    />
  )
}



