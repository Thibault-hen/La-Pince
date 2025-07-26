import { Hono } from 'hono';
import accountRouter from './controllers/account';
import authRouter from './controllers/auth';
import budgetRouter from './controllers/budget';
import categoryRouter from './controllers/category';
import colorRouter from './controllers/color';
import { contactController } from './controllers/contact';
import dashboardRouter from './controllers/dashboard';
import exchangeRateRouter from './controllers/exchangeRate';
import expenseRouter from './controllers/expense';
import incomeRouter from './controllers/income';
import notificationRouter from './controllers/notification';
import { isAuthenticated } from './middlewares/auth.middleware';
import { apiRateLimit } from './utils/rateLimits';

const router = new Hono();

router.use('/api/*', apiRateLimit);
router.route('/api/v1', authRouter);
router.route('/api/v1/', contactController);

router.use('/api/v1/*', isAuthenticated);
router.route('/api/v1', accountRouter);
router.route('/api/v1', exchangeRateRouter);
router.route('/api/v1', budgetRouter);
router.route('/api/v1', categoryRouter);
router.route('/api/v1', colorRouter);
router.route('/api/v1', dashboardRouter);
router.route('/api/v1', expenseRouter);
router.route('/api/v1', incomeRouter);
router.route('/api/v1', notificationRouter);

export default router;
