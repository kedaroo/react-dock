import { useState, useRef } from 'react';
import './index.css'
import { 
  DEFAULT_WIDTH, 
  isElementWithinSpan, 
  calculateWidth, 
  calculateScaleFactor, 
  throttle,
  calculateAbsoluteCenterDistance
} from './utils';
import Item from './Item';

interface Props {
  items: React.ReactNode[];
  magnification: number;
  span: number;
  gap: number;
}

export default function Dock(props: Props) {
  const [widthArray, setScaleValue] = useState<number[]>(
    () => new Array<number>(props.items.length).fill(DEFAULT_WIDTH)
  );
  const conRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!conRef.current) return;
    const box = conRef.current.getBoundingClientRect();
    const offsetX = e.clientX - box.x;
    const cursorCenter = Math.max(offsetX, 0)

    const res = []
    for (let i = 0; i < props.items.length; i++) {
      if (isElementWithinSpan(i, cursorCenter, props.span, widthArray, props.gap)) {
        const absDistFromCursorCenter = Math.abs(cursorCenter - calculateAbsoluteCenterDistance(i, widthArray, props.gap))
        const absoluteInvertedDistance = Math.abs((props.span / 2) - absDistFromCursorCenter)
        res.push(calculateWidth(calculateScaleFactor(absoluteInvertedDistance, widthArray[i]), DEFAULT_WIDTH, props.magnification))
      } else {
        res.push(DEFAULT_WIDTH)
      }
    }

    setScaleValue(res)
  }
  
  const throttledMouseMoveHandler = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e)
  }, 500);
  
  return (
    <>
      <div
        ref={conRef}
        className="con"
        onMouseMove={throttledMouseMoveHandler}
        onMouseLeave={() => {setScaleValue(new Array(props.items.length).fill(DEFAULT_WIDTH))}}
        style={{gap: props.gap}}
      >
        {props.items.map((I, idx) => (
          <Item gap={props.gap} width={widthArray[idx]} index={idx} key={idx}>
            {I}
          </Item>
        ))} 
      </div>      
    </>
  )
}
