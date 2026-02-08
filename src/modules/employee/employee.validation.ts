import Joi from 'joi';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../../interfaces/employee';

export const createEmployeeSchema = Joi.object<CreateEmployeeDTO>({
  name: Joi.string().required().min(2).max(100),
  age: Joi.number().integer().min(18).max(100).required(),
  designation: Joi.string().required().min(2).max(100),
  hiring_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  salary: Joi.number().positive().required(),
  deleted_at:Joi.date().default(null)
});

export const updateEmployeeSchema = Joi.object<UpdateEmployeeDTO>({
  name: Joi.string().min(2).max(100),
  age: Joi.number().integer().min(18).max(100),
  designation: Joi.string().min(2).max(100),
  hiring_date: Joi.date(),
  date_of_birth: Joi.date(),
  salary: Joi.number().positive(),
  deleted_at:Joi.date().default(null)
});