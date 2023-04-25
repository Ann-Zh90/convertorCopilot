export const debounce = <Params extends unknown[]>(
  func: (...args: Params) => unknown,
  wait: number = 1200
): ((...args: Params) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Params) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
