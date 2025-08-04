import { ColorStatus, getColorStatus } from '@/utils/colorStatus';

describe('getColorStatus', () => {
	describe('ColorStatus enum values', () => {
		it('should have correct color values', () => {
			expect(ColorStatus.ok).toBe('#10a243');
			expect(ColorStatus.warning).toBe('#eb8c34');
			expect(ColorStatus.alert).toBe('#FF0000');
		});
	});
	describe('normal cases', () => {
		it('should return green color for 0% percentage', () => {
			const okColor = getColorStatus(0, 100);
			expect(okColor).toBe(ColorStatus.ok);
		});
		it('should return green color between 0% and 60%', () => {
			const okColor = getColorStatus(50, 100);
			expect(okColor).toBe(ColorStatus.ok);
		});
		it('should return orange color between 60% and 90%', () => {
			const warningColor = getColorStatus(65, 100);
			expect(warningColor).toBe(ColorStatus.warning);
		});
		it('should return red color when reaching 90% percentage', () => {
			const alertColor = getColorStatus(90, 100);
			expect(alertColor).toBe(ColorStatus.alert);
		});

		describe('real-world budget scenarios', () => {
			it('should return green for budget well under limit', () => {
				const result = getColorStatus(250.5, 500); // 50.1%
				expect(result).toBe(ColorStatus.ok);
			});

			it('should return orange for budget approaching limit', () => {
				const result = getColorStatus(450.75, 600); // 75.125%
				expect(result).toBe(ColorStatus.warning);
			});

			it('should return red for budget over limit', () => {
				const result = getColorStatus(1200, 1000); // 120%
				expect(result).toBe(ColorStatus.alert);
			});
		});
	});
});
