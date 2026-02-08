import { Router, type Router as ExpressRouter } from "express";
import employeeController from "./employee.controller";
import { validate } from "../../middleware/validation";
import { upload } from "../../middleware/upload";
import { auth } from "../../middleware/auth";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "./employee.validation";


const router: ExpressRouter = Router();

router.use(auth);

router
  .route("/")
  .get(employeeController.getEmployees)
  .post(
    upload.single('photo'),
     
    validate(createEmployeeSchema), // Validate after multer processes the file
    employeeController.createEmployee
  );

router
  .route("/:id")
  .get(employeeController.getEmployee)
  .put(
    upload.single("photo"),
    validate(updateEmployeeSchema),
    employeeController.updateEmployee
  )
  .delete(employeeController.deleteEmployee);

export default router;
