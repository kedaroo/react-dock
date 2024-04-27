const REM = 16
const SPAN = 300
export const DEFAULT_WIDTH = 3 * REM

export const isElementWithinSpan = (
  index: number, 
  center: number, 
  span: number, 
  widthArray: number[],
  gap: number
): boolean => {
  const elCenter = calculateAbsoluteCenterDistance(index, widthArray, gap);
  const halfSpan = span / 2;

  return Math.abs(elCenter - center) <= halfSpan;
};

export const calculateAbsoluteCenterDistance = (index: number, widthArray: number[], gap: number) => {
  let sumOfWidths = 0
  for (let i = 0; i < index; i++) {
    sumOfWidths += widthArray[i]
  }

  sumOfWidths += ((index + 1) * gap)
  sumOfWidths += widthArray[index] / 2
  return sumOfWidths
}

export const calculateScaleFactor = (absInvDistance: number, elWidth: number): number => {
  return Math.round(Math.min(absInvDistance / ((SPAN / 2) - (elWidth / 2)), 1) * 100) / 100
}

export const calculateWidth = (scaleFactor: number, defaultWidth: number, magnification: number): number => {
  const res = Math.round(defaultWidth * (1 + scaleFactor * magnification) * 100) / 100
  return res
}

type ThrottleFunction<T extends unknown[]> = (...args: T) => void;

export function throttle<T extends unknown[]>(
  func: ThrottleFunction<T>,
  delay: number
): ThrottleFunction<T> {
  let lastExecutedTime = 0;
  let shouldExecute = true;

  return function (...args: T) {
    const currentTime = Date.now();

    if (shouldExecute) {
      func(...args);
      lastExecutedTime = currentTime;
      shouldExecute = false;

      setTimeout(() => {
        const elapsedTime = currentTime - lastExecutedTime;
        if (elapsedTime >= delay) {
          shouldExecute = true;
        }
      }, delay);
    }
  };
}