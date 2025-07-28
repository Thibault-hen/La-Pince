import { getPercentage, getPercentageRaw } from '../utils/percentage';

describe('getPercentage', () => {
  describe('normal cases', () => {
    it('should return "0.00%" for 0 value', () => {
      const result = getPercentage(0, 100);
      expect(result).toBe('0.00%');
    });
    it('should return "50.00%" for 50 value and 100 max', () => {
      const result = getPercentage(50, 100);
      expect(result).toBe('50.00%');
    });
    it('should return "100.00%" for 100 value and 100 max', () => {
      const result = getPercentage(100, 100);
      expect(result).toBe('100.00%');
    });
  });

  describe('real world amounts/budgets scenarios', () => {
    it('should return "50.10%" for 250.5 value and 500 max', () => {
      const result = getPercentage(250.5, 500);
      expect(result).toBe('50.10%');
    });

    it('should return "75.13%" for 450.75 value and 600 max', () => {
      const result = getPercentage(450.75, 600);
      expect(result).toBe('75.13%');
    });

    it('should return "120.00%" for 1200 value and 1000 max', () => {
      const result = getPercentage(1200, 1000);
      expect(result).toBe('100.00%');
    });
  });
});

describe('getPercentageRaw', () => {
  describe('normal cases', () => {
    it('should return 0 for 0 value', () => {
      const result = getPercentageRaw(0, 100);
      expect(result).toBe(0);
    });
    it('should return 50 for 50 value', () => {
      const result = getPercentageRaw(50, 100);
      expect(result).toBe(50);
    });
    it('should return 100 for 100 value', () => {
      const result = getPercentageRaw(100, 100);
      expect(result).toBe(100);
    });
  });

  describe('real world amounts/budgets scenarios', () => {
    it('should return 50.1 for 250.5 value and 500 max', () => {
      const result = getPercentageRaw(250.5, 500);
      expect(result).toBe(50.1);
    });
    it('should return 75.125 for 450.75 value and 600 max', () => {
      const result = getPercentageRaw(450.75, 600);
      expect(result).toBe(75.125);
    });
    it('should return 120 for 1200 value and 1000 max', () => {
      const result = getPercentageRaw(1200, 1000);
      expect(result).toBe(120);
    });
  });

  describe('edge cases', () => {
    it('should return 0 for 0 max', () => {
      const result = getPercentageRaw(50, 0);
      expect(result).toBe(0);
    });
  });
});
