import '@testing-library/jest-dom';
import { vi } from 'vitest';

Object.defineProperty(global, 'crypto', {
	value: {
		randomUUID: vi.fn(() => 'mock-uuid-1234'),
	},
});
