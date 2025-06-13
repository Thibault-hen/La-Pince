export const getPercentage = (value: number, max: number): string => {
  return (((value ?? 0) / (max ?? 1)) * 100).toFixed(1) + '%';
};
