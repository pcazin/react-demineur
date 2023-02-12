import { useState, Dispatch } from "react";
import { Mode } from "../../shared/enums";
import "./style.css";

export default function DemineurNav({ setMode }: { setMode: Dispatch<React.SetStateAction<Mode>> }) {

  const [time, setTime] = useState<number>(0)

  // console.log(Object.values(Mode));
  

  return (
    <div id="nav">

      <select name="difficulty" id="difficulty">
        
      </select>

      <button>
        nouvelle partie
      </button>

      <p>temps: { time }</p>
      
    </div>
  )
}