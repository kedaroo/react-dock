const EL_COUNT = 10;
const REM = 16
const GAP = 1 * REM
const SPAN = 300
export const DEFAULT_WIDTH = 3 * REM

export const isElementWithinSpan = (index: number, center: number, span: number, widthArray: number[]): boolean => {
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

export const calculateScaleFactor = (absInvDistance: number, elWidth: number): number => {
  return Math.round(Math.min(absInvDistance / ((SPAN / 2) - (elWidth / 2)), 1) * 100) / 100
}

export const calculateWidth = (scaleFactor: number, width: number, magnification: number): number => {
  const res = Math.round(width * (1 + scaleFactor * magnification) * 100) / 100
  return res
}