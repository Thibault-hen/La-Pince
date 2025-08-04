import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pino from 'pino';
import { getEnv } from './env';

const { NODE_ENV } = getEnv();
const isProd = NODE_ENV === 'production';
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);
const logDir = path.resolve(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

export const logger = pino(
	isProd
		? {
				level: 'info',
				transport: {
					targets: [
						{
							target: 'pino/file',
							options: {
								destination: `${logDir}/info.log`,
							},
							level: 'info',
						},
						{
							target: 'pino/file',
							options: {
								destination: `${logDir}/error.log`,
							},
							level: 'error',
						},
					],
				},
			}
		: {
				level: 'debug',
				transport: {
					targets: [
						{
							target: 'pino-pretty',
							options: {
								colorize: true,
								translateTime: 'SYS:standard',
								ignore: 'pid,hostname',
							},
						},
					],
				},
			},
);
