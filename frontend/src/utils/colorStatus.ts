export const ColorStatus = {
	ok: '#10a243',
	warning: '#eb8c34',
	alert: '#FF0000',
} as const;

export const ColorPercentage = {
	ok: 60,
	warning: 90,
} as const;

export const getColorStatus = (value: number, max: number): string => {
	if (value === 0 || max <= 0) return ColorStatus.ok;

	const percentage = (value / max) * 100;

	if (percentage < ColorPercentage.ok) return ColorStatus.ok;
	if (percentage < ColorPercentage.warning) return ColorStatus.warning;

	return ColorStatus.alert;
};
