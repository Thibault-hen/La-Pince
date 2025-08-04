export const getPercentage = (value: number, max: number): string => {
	if (max <= 0) {
		return '0%';
	}
	const percentage = (value / max) * 100;

	return percentage > 100 ? '100.00%' : `${percentage.toFixed(2)}%`;
};

export const getPercentageRaw = (value: number, max: number): number => {
	if (max <= 0) {
		return 0;
	}
	return ((value ?? 0) / (max ?? 1)) * 100;
};
