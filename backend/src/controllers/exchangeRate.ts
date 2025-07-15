import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { response200 } from '../utils/openapi';
import { redisClient } from '../utils/redis';
import { exchangeRateSelectSchema } from '../validators/exchangeRate';

const exchangeRateRouter = new Hono();

exchangeRateRouter.basePath('/exchange-rate').get(
	'/',
	describeRoute({
		description: 'Get the exchange rate for EUR currency',
		tags: ['exchange-rate'],
		responses: {
			200: response200(exchangeRateSelectSchema),
		},
	}),
	async (c) => {
		const cachedRates = await redisClient.get('exchange_rates');

		if (cachedRates) {
			return c.json(JSON.parse(cachedRates), 200);
		}

		const response = await fetch('https://open.er-api.com/v6/latest/EUR');
		if (!response.ok) {
			return c.json(
				{ message: 'Failed to fetch exchange rates public API' },
				500,
			);
		}
		const rates = await response.json();

		redisClient.set('exchange_rates', JSON.stringify(rates), {
			EX: 60 * 60,
		});

		return c.json(rates, 200);
	},
);

export default exchangeRateRouter;
