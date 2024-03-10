export const toFixed = (num: number, precision: number) => {
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(num * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
};
