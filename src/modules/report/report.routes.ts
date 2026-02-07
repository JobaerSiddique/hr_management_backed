import { Router, type Router as ExpressRouter } from "express";
import reportController from "./report.controller";
import { auth } from "../../middleware/auth";

const router: ExpressRouter = Router();

router.use(auth);

router.get("/attendance", reportController.getMonthlyAttendanceReport);

export default router;
