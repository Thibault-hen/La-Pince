const ColorStatus = {
  ok: '#34eb74',
  warning: '#eb8c34',
  alert: '#FF0000',
};

export const getColorStatus = (value: number, max: number): string => {
  const percentage = (value / max) * 100;

  if (percentage < 60) return ColorStatus.ok;
  if (percentage < 90) return ColorStatus.warning;

  return ColorStatus.alert;
};
