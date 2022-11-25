import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { AppointmentDto } from '../../dtos/response/appointment.dto';
import { GetAppointments } from '../../messages/queries/get-appointments.query';
import { AppointmentMapper } from '../../mappers/appointment.mapper';

@QueryHandler(GetAppointments)
export class GetAppointmentsHandler implements IQueryHandler<GetAppointments> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetAppointments) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      day,
      month,
      year
    FROM 
      appointments
    ORDER BY
      day, month;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const personClients: AppointmentDto[] = rows.map(function (row: any) {
      return AppointmentMapper.ormToAppointmentDto(row);
    });
    return personClients;
  }
}