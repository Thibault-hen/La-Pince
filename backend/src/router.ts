import { Hono } from "hono";
import authRouter from "./controllers/auth";
import categoryRouter from "./controllers/category";
import budgetRouter from "./controllers/budget";
import accountRouter from "./controllers/account";
import expenseRouter from "./controllers/expense";
import incomeRouter from "./controllers/income";
import notificationRouter from "./controllers/notification";
import { isAuthenticated } from "./middlewares/auth.middleware";
import colorRouter from "./controllers/color";
import dashboardRouter from "./controllers/dashboard";

const router = new Hono()

router.route('/api/v1', authRouter)
router.use('/api/v1/*', isAuthenticated);
router.route('/api/v1', accountRouter)
router.route('/api/v1', budgetRouter)
router.route('/api/v1', categoryRouter)
router.route('/api/v1', colorRouter)
router.route('/api/v1', dashboardRouter)
router.route('/api/v1', expenseRouter)
router.route('/api/v1', incomeRouter)
router.route('/api/v1', notificationRouter)


export default router;
