import { useRef, useState } from "react";
import "./App.css";
import Item from "./Item";
import { throttle } from "./utils";

const EL_COUNT = 10;
const REM = 16
const WIDTH = 3 * REM
const GAP = 1 * REM
const SPAN = 300
export const DEFAULT_WIDTH = 48

const isElementWithinSpan = (index: number, center: number, span: number, widthArray: number[]): boolean => {
  const elCenter = calculateAbsoluteCenterDistance(index, widthArray);
  const halfSpan = span / 2;

  return Math.abs(elCenter - center) <= halfSpan;
};

const calculateAbsoluteCenterDistance = (index: number, widthArray: number[]) => {
  let sumOfWidths = 0
  for (let i = 0; i < index; i++) {
    sumOfWidths += widthArray[i]
  }

  sumOfWidths += ((index + 1) * GAP)
  sumOfWidths += widthArray[index] / 2
  return sumOfWidths
}

const calculateScaleFactor = (absInvDistance: number, elWidth: number): number => {
  return Math.round(Math.min(absInvDistance / ((SPAN / 2) - (elWidth / 2)), 1) * 100) / 100
}

const calculateWidth = (scaleFactor: number, width: number, magnification: number): number => {
  const res = Math.round(width * (1 + scaleFactor * magnification) * 100) / 100
  return res
}

function App() {
  const [widthArray, setScaleValue] = useState<number[]>(() => new Array<number>(EL_COUNT).fill(DEFAULT_WIDTH));
  const [magnification, setMagnification] = useState(0.4);
  const conRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!conRef.current) return;
    const box = conRef.current.getBoundingClientRect();
    const offsetX = e.clientX - box.x;
    const cursorCenter = Math.max(offsetX, 0)

    const res = []

    for (let i = 0; i < EL_COUNT; i++) {
      if (isElementWithinSpan(i, cursorCenter, SPAN, widthArray)) {
        const absDistFromCursorCenter = Math.abs(cursorCenter - calculateAbsoluteCenterDistance(i, widthArray))
        const absoluteInvertedDistance = Math.abs((SPAN / 2) - absDistFromCursorCenter)
        res.push(calculateWidth(calculateScaleFactor(absoluteInvertedDistance, widthArray[i]), WIDTH, magnification))
      } else {
        res.push(WIDTH)
      }
    }

    setScaleValue(res)
  }
  
  const throttledMouseMoveHandler = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e)
  }, 500);

  return (
    <>
      <input step={0.1} type="range" min={0} max={1} value={magnification} onChange={(e) => {setMagnification(parseFloat(e.target.value))}} />
      <span style={{fontSize: '2rem'}}>{magnification}</span>
      <div
        ref={conRef}
        className="con"
        onMouseMove={throttledMouseMoveHandler}
        onMouseLeave={() => {setScaleValue(new Array(EL_COUNT).fill(DEFAULT_WIDTH))}}
      >
        {new Array(EL_COUNT).fill("").map((_, idx) => (
          <Item
            key={idx}
            index={idx}
            width={widthArray[idx]}
          />
        ))}
      </div>      
    </>
  );
}

export default App;
