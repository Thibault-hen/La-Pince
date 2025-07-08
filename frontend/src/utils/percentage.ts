export const getPercentage = (value: number, max: number): string => {
  if (max <= 0) {
    return '0%';
  }
  const percentage =
    ((Number(value.toFixed(2)) ?? 0) / Number(max.toFixed(2) ?? 1)) * 100;

  return percentage > 100 ? '100%' : `${percentage.toFixed(2)}%`;
};

export const getPercentageRaw = (value: number, max: number): number => {
  if (max <= 0) {
    return 0;
  }
  return ((value ?? 0) / (max ?? 1)) * 100;
};
