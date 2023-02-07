import { Dispatch, useEffect, useState } from "react"
import { CellState } from "../../shared/enums";
import Default from "../../assets/cell/unopened.png";
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
import Interrogation from "../../assets/cell/interrogation.png";
import Flag from "../../assets/cell/flag.png";
import { ModeSpec } from "../../shared/types";
import { log } from "console";


interface ICell {
  id: string, // key
  modeSpec: ModeSpec, // gameMod 
  setRevealAll: Dispatch<React.SetStateAction<number>>, // revealAll the grid if bomb is pressed or game end
  cellState: CellState, // enum status of the grid
  axes: { x: number, y: number }, // position on the grid, used to determine if i have to show the cell for expend empty
  setRevealEmptyCellAround: Dispatch<React.SetStateAction<{ x: number, y: number }>>, // trigger to show empty cell arround
  revealEmptyCellAround: { x: number, y: number } // axes positions, used to revealed empty cells around
}

export function Cell({ id, modeSpec, setRevealAll, cellState, axes, setRevealEmptyCellAround, revealEmptyCellAround }: ICell) {

  const [image, setImage] = useState<string>(Default);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    console.log("working")
  }, [revealEmptyCellAround])

  const revealAll = () => {
    setRevealAll(val => val + 1);
  }

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!isRevealed && e.button === 0) {
      setImage(Empty)
    }

    if (!isRevealed && e.button === 2) {
      switch (image) {
        case Default:
          setImage(Flag);
          break;
        case Flag:
          setImage(Interrogation);
          break;
        case Interrogation:
          setImage(Default);
          break;
      }
    }
  }

  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (!isRevealed && e.button === 0) {
      setIsRevealed(revealed => !revealed);
      reveal();
    }
  }

  const onMouseLeave = () => {
    if (!isRevealed && image === Default) {
      setImage(Default);
    }
    if (!isRevealed && image === Empty) {
      setImage(Default);
    }
  }

  const reveal = () => {
    if (!isRevealed) {
      switch (cellState) {
        case CellState.EMPTY:
          setImage(Empty)
          // je dois révéler toutes les cases vides
          setRevealEmptyCellAround({ x: axes.x, y: axes.y })
          break;
        case CellState.BOMB:
          setImage(Bomb)
          break;
        case CellState.ONE:
          setImage(One)
          break;
        case CellState.TWO:
          setImage(Two)
          break;
        case CellState.THREE:
          setImage(Three)
          break;
        case CellState.FOUR:
          setImage(Four)
          break;
        case CellState.FIVE:
          setImage(Five)
          break;
        case CellState.SIX:
          setImage(Six)
          break;
        case CellState.SEVEN:
          setImage(Seven)
          break;
        case CellState.EIGHT:
          setImage(Eight)
          break;
        default:
          throw new Error("erreur switch cellState");
      }
    }
  }

  const onMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    if (!isRevealed && e.buttons === 1) {
      setImage(Empty)
    }
  }

  return (
    <img
      key={id}
      src={image}
      alt="cell"
      draggable={false}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
      style={{ width: modeSpec.containerSize / modeSpec.size }}
    />
  )
}


