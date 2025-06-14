export const getPercentage = (value: number, max: number): string => {
  if (max <= 0) {
    return '0%';
  }
  return (((value ?? 0) / (max ?? 1)) * 100).toFixed(1) + '%';
};
