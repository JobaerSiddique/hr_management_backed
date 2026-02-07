import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import employeeService from './employee.service';
import ApiError from '../../utils/ApiError';
import { CreateEmployeeDTO, UpdateEmployeeDTO, EmployeeQueryParams } from '../../interfaces/employee';

class EmployeeController {
  createEmployee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateEmployeeDTO = req.body;
    console.log(data);
    const photo = req.file;
    console.log(photo);

    if (photo && !photo.path) {
      throw new ApiError(400, 'Failed to upload photo');
    }

    const result = await employeeService.createEmployee(data, photo?.path);

    sendResponse(res, {
      success: true,
      message: 'Employee created successfully',
      data: result,
    });
  });

  getEmployees = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const params: EmployeeQueryParams = req.query;
    const result = await employeeService.getEmployees(params);

    sendResponse(res, {
      success: true,
      message: 'Employees retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  });

  getEmployee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id =  Number(req.params.id);;
    const result = await employeeService.getEmployeeById(id);

    sendResponse(res, {
      success: true,
      message: 'Employee retrieved successfully',
      data: result,
    });
  });

  updateEmployee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id =  Number(req.params.id);;
    const data: UpdateEmployeeDTO = req.body;
    const photo = req.file;

    const result = await employeeService.updateEmployee(id, data, photo?.path);

    sendResponse(res, {
      success: true,
      message: 'Employee updated successfully',
      data: result,
    });
  });

  deleteEmployee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id =  Number(req.params.id);;
    await employeeService.softDeleteEmployee(id);

    sendResponse(res, {
      success: true,
      message: 'Employee deleted successfully',
      data: null,
    });
  });
}

export default new EmployeeController();