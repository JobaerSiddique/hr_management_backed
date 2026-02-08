import db from '../../config/database';
import ApiError from '../../utils/ApiError';
import QueryBuilder from '../../utils/QueryBuilder';
import employeeService from '../employee/employee.service';
import {
  IAttendance,
  CreateAttendanceDTO,
  UpdateAttendanceDTO,
  AttendanceQueryParams,
} from '../../interfaces/attendance';

export class AttendanceService {
  async createOrUpdateAttendance(data: CreateAttendanceDTO): Promise<IAttendance> {
    // Check if employee exists
    const employeeExists = await employeeService.employeeExists(data.employee_id);
    if (!employeeExists) {
      throw new ApiError(404, 'Employee not found');
    }

    

    // Check for existing attendance on the same day
    const existingAttendance = await db<IAttendance>('attendance')
      .where({
        employee_id: data.employee_id,
        date: new Date(data.date),
      })
      .first();

    if (existingAttendance) {
      // Update existing attendance
      const [updatedAttendance] = await db<IAttendance>('attendance')
        .where({ id: existingAttendance.id })
        .update({
          check_in_time: data.check_in_time,
          updated_at: new Date(),
        })
        .returning('*');

      return updatedAttendance;
    } else {
      // Create new attendance
      const [attendance] = await db<IAttendance>('attendance')
        .insert({
          employee_id: data.employee_id,
          date: new Date(data.date),
          check_in_time: data.check_in_time,
        })
        .returning('*');

      return attendance;
    }
  }

 async getAttendances(params: AttendanceQueryParams) {
  const query = db<IAttendance>('attendance')
    .select('attendance.*', 'employees.name as employee_name')
    .leftJoin('employees', 'attendance.employee_id', 'employees.id')
    .whereNull('employees.deleted_at'); // ✅ deleted employee attendance hide

  const queryBuilder = new QueryBuilder<IAttendance>(query, params);

  if (params.employee_id) {
    queryBuilder.where((qb) => {
      qb.where('attendance.employee_id', params.employee_id);
    });
  }

 if (params.from && params.to) {
  const from = params.from;
  const to = params.to;

  queryBuilder.where((qb) => {
    qb.whereBetween('attendance.date', [from, to]);
  });
} else if (params.date) {
  const date = params.date;

  queryBuilder.where((qb) => {
    qb.where('attendance.date', date);
  });
}


  return await queryBuilder
    .sort()
    .paginate()
    .execute();
}


  async getAttendanceById(id: number): Promise<IAttendance> {
    const attendance = await db<IAttendance>('attendance')
      .select('attendance.*', 'employees.name as employee_name')
      .leftJoin('employees', 'attendance.employee_id', 'employees.id')
      .where('attendance.id', id)
      .first();

    if (!attendance) {
      throw new ApiError(404, 'Attendance record not found');
    }

    return attendance;
  }

  async updateAttendance(id: number, data: UpdateAttendanceDTO): Promise<IAttendance> {
    const attendance = await this.getAttendanceById(id);

    const updateData: any = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date);
    }

    updateData.updated_at = new Date();

    // If employee_id is being updated, check if employee exists
    if (data.employee_id && data.employee_id !== attendance.employee_id) {
      const employeeExists = await employeeService.employeeExists(data.employee_id);
      if (!employeeExists) {
        throw new ApiError(404, 'Employee not found');
      }
    }

    const [updatedAttendance] = await db<IAttendance>('attendance')
      .where({ id })
      .update(updateData)
      .returning('*');

    return updatedAttendance;
  }

 async deleteAttendance(id: number): Promise<void> {
  await this.getAttendanceById(id); // just call for validation
  await db<IAttendance>('attendance').where({ id }).delete();
}

}

export default new AttendanceService();