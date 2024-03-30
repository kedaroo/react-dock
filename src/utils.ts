type DebounceFunction<T extends unknown[]> = (...args: T) => void;

export function debounce<T extends unknown[]>(
  func: DebounceFunction<T>,
  delay: number
): DebounceFunction<T> {
  let timeout: number | undefined;

  return function (...args: T) {
    const later = () => {
      timeout = undefined;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
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