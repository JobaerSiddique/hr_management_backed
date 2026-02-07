import db from '../../config/database';
import ApiError from '../../utils/ApiError';
import QueryBuilder from '../../utils/QueryBuilder';
import {
  IEmployee,
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
  EmployeeQueryParams,
} from '../../interfaces/employee';

export class EmployeeService {
 async createEmployee(data: CreateEmployeeDTO, photoPath?: string): Promise<IEmployee> {
    // Convert date strings to Date objects
    const employeeData: any = {
      name: data.name,
      age: data.age,
      designation: data.designation,
      salary: data.salary,
    };

    // Handle date conversions
    if (data.hiring_date) {
      employeeData.hiring_date = new Date(data.hiring_date);
    }
    
    if (data.date_of_birth) {
      employeeData.date_of_birth = new Date(data.date_of_birth);
    }

    if (photoPath) {
      employeeData.photo_path = photoPath;
    }

    try {
      const [employee] = await db<IEmployee>('employees')
        .insert(employeeData)
        .returning('*');

      return employee;
    } catch (error: any) {
      console.error('Database error:', error);
      throw new ApiError(500, `Database error: ${error.message}`);
    }
  }

  async getEmployees(params: EmployeeQueryParams) {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const offset = (page - 1) * limit;

  // Create base query
  let query = db<IEmployee>('employees').select('*');

  // Apply search
  if (params.search) {
    query = query.where((builder) => {
      builder.where('name', 'ILIKE', `%${params.search}%`)
             .orWhere('designation', 'ILIKE', `%${params.search}%`);
    });
  }

  // Apply filters
  if (params.designation) {
    query = query.where('designation', params.designation);
  }

  if (params.minSalary) {
    query = query.where('salary', '>=', params.minSalary);
  }

  if (params.maxSalary) {
    query = query.where('salary', '<=', params.maxSalary);
  }

  // Create count query separately
  let countQuery = db('employees').count('* as total');
  
  // Apply same filters to count query
  if (params.search) {
    countQuery = countQuery.where((builder) => {
      builder.where('name', 'ILIKE', `%${params.search}%`)
             .orWhere('designation', 'ILIKE', `%${params.search}%`);
    });
  }

  if (params.designation) {
    countQuery = countQuery.where('designation', params.designation);
  }

  if (params.minSalary) {
    countQuery = countQuery.where('salary', '>=', params.minSalary);
  }

  if (params.maxSalary) {
    countQuery = countQuery.where('salary', '<=', params.maxSalary);
  }

  // Apply sorting
  if (params.sort) {
    const [field, order] = params.sort.startsWith('-')
      ? [params.sort.substring(1), 'desc']
      : [params.sort, 'asc'];
    query = query.orderBy(field, order as 'asc' | 'desc');
  } else {
    query = query.orderBy('id', 'desc');
  }

  // Apply pagination
  query = query.limit(limit).offset(offset);

  // Execute both queries in parallel
  const [data, countResult] = await Promise.all([
    query,
    countQuery.first(),
  ]);

  const total = Number(countResult?.total) || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

  async getEmployeeById(id: number): Promise<IEmployee> {
    const employee = await db<IEmployee>('employees')
      .where({ id })
      .first();

    if (!employee) {
      throw new ApiError(404, 'Employee not found');
    }

    return employee;
  }

  async updateEmployee(
    id: number,
    data: UpdateEmployeeDTO,
    photoPath?: string
  ): Promise<IEmployee> {
    const employee = await this.getEmployeeById(id);

    const updateData: any = { ...data };
    
    if (data.hiring_date) {
      updateData.hiring_date = new Date(data.hiring_date);
    }
    if (data.date_of_birth) {
      updateData.date_of_birth = new Date(data.date_of_birth);
    }
    if (photoPath) {
      updateData.photo_path = photoPath;
    }

    updateData.updated_at = new Date();

    const [updatedEmployee] = await db<IEmployee>('employees')
      .where({ id })
      .update(updateData)
      .returning('*');

    return updatedEmployee;
  }

  async deleteEmployee(id: number): Promise<void> {
    const employee = await this.getEmployeeById(id);

    await db<IEmployee>('employees').where({ id }).delete();
  }

  async employeeExists(id: number): Promise<boolean> {
    const employee = await db<IEmployee>('employees')
      .where({ id })
      .first();
    return !!employee;
  }
}

export default new EmployeeService();