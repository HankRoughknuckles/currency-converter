export const isPositiveNumberString = (input: string): boolean => {
  if (input === "") return false;
  const inputAsNumber = Number(input);
  if (Number.isNaN(inputAsNumber)) return false;

  return inputAsNumber >= 0;
};
