export const ColorStatus = {
  ok: '#10a243',
  warning: '#eb8c34',
  alert: '#FF0000',
};

export const ColorPercentage = {
  ok: 60,
  warning: 90,
};

export const getColorStatus = (value: number, max: number): string => {
  if (value === 0) return ColorStatus.ok;

  if (max <= 0) return ColorStatus.ok;

  let percentage = (value / max) * 100;

  if (percentage < 60) return ColorStatus.ok;
  if (percentage < 90) return ColorStatus.warning;
  return ColorStatus.alert;
};
