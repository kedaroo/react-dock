import { useRef, useState } from "react";
import "./App.css";
import Item from "./Item";
import { throttle } from "./utils";

const EL_COUNT = 9;
const REM = 16
const WIDTH = 3 * REM
const GAP = 1 * REM
const SPAN = 400

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

const calculateWidth = (scaleFactor: number, width: number): number => {
  const res = Math.round(width * (1 + scaleFactor * 0.5) * 100) / 100
  return res
}

function App() {
  const [widthArray, setScaleValue] = useState<number[]>(() => new Array<number>(EL_COUNT).fill(48));
  const conRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cursorCenter = Math.max(e.nativeEvent.offsetX, 0)

    const res = []

    for (let i = 0; i < EL_COUNT; i++) {
      if (isElementWithinSpan(i, cursorCenter, SPAN, widthArray)) {
        const absDistFromCursorCenter = Math.abs(cursorCenter - calculateAbsoluteCenterDistance(i, widthArray))
        const absoluteInvertedDistance = Math.abs((SPAN / 2) - absDistFromCursorCenter)
        res.push(calculateWidth(calculateScaleFactor(absoluteInvertedDistance, widthArray[i]), WIDTH))
      } else {
        res.push(WIDTH)
      }
    }

    setScaleValue(res)
  }

  const throttledMouseMoveHandler = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e)
  }, 10);

  return (
    <div className="wrapper">
      <div
        ref={conRef}
        className="con"
      >
        {new Array(EL_COUNT).fill("").map((_, idx) => (
          <Item
            key={idx}
            index={idx}
            width={widthArray[idx]}
          />
        ))}
      </div>
      <div
        className="catcher"
        onMouseMove={throttledMouseMoveHandler}
        onMouseLeave={() => {setScaleValue(new Array(EL_COUNT).fill(48))}}
      />
    </div>
  );
}

export default App;
