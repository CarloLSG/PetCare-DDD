import { Appointment } from 'src/appointments/domain/aggregates/client/appointment.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterAppointment } from '../messages/commands/register-appointment.command';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { RegisterAppointmentRequest } from '../dtos/request/register-appointment-request.dto';
import { RegisterAppointmentResponse } from '../dtos/response/register-appointment-response.dto';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';
import { Day } from 'src/shared/domain/values/day.value';
import { Month } from 'src/shared/domain/values/month.value';
import { Year } from 'src/shared/domain/values/year.value';
import { AppointmentId } from 'src/appointments/domain/aggregates/client/appointment-id.value';
import { AppointmentFactory } from 'src/appointments/domain/factories/appointment.factory';
import { AppointmentEntity } from 'src/appointments/infrastructure/persistence/entities/appointment.entity';
import { DayValue } from 'src/appointments/infrastructure/persistence/values/day.value';
import { MonthValue } from 'src/appointments/infrastructure/persistence/values/month.value';
import { YearValue } from 'src/appointments/infrastructure/persistence/values/year.value';
import { AppointmentDto } from '../dtos/response/appointment.dto';

export class AppointmentMapper {
  public static dtoRequestToCommand(registerAppointmentRequest: RegisterAppointmentRequest) {
    return new RegisterAppointment(
      registerAppointmentRequest.day,
      registerAppointmentRequest.month,
      registerAppointmentRequest.year,
    );
  }

  public static domainToDtoResponse(appointment: Appointment) {
    return new RegisterAppointmentResponse(
      appointment.getId().getValue(),
      appointment.getDay().getValue(),
      appointment.getMonth().getValue(),
      appointment.getYear().getValue(),
      appointment.getAuditTrail().getCreatedAt().format(),
      appointment.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterAppointment, appointmentId: number): Appointment {
    const day: Day = Day.create(command.day);
    const month: Month = Month.create(command.month);
    const year: Year = Year.create(command.year);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      AppointmentId.of(appointmentId),
      null,
      null
    );
    let appointment: Appointment = AppointmentFactory.from(day, month, year, auditTrail);
    return appointment;
  }

  public static domainToEntity(appointment: Appointment): AppointmentEntity {
    const appointmentEntity: AppointmentEntity = new AppointmentEntity();
    appointmentEntity.day = DayValue.from(appointment.getDay().getValue());
    appointmentEntity.month = MonthValue.from(appointment.getMonth().getValue());
    appointmentEntity.year = YearValue.from(appointment.getYear().getValue());
    const createdAt: string = appointment.getAuditTrail() != null && appointment.getAuditTrail().getCreatedAt() != null ? appointment.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = appointment.getAuditTrail() != null && appointment.getAuditTrail().getCreatedBy() != null ? appointment.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = appointment.getAuditTrail() != null && appointment.getAuditTrail().getUpdatedAt() != null ? appointment.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = appointment.getAuditTrail() != null && appointment.getAuditTrail().getUpdatedBy() != null ? appointment.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    appointmentEntity.auditTrail = auditTrailValue;
    return appointmentEntity;
  }

  public static entityToDomain(appointmentEntity: AppointmentEntity): Appointment {
    if (appointmentEntity == null) return null;
    const day: Day = Day.create(appointmentEntity.day.day);
    const month: Month = Month.create(appointmentEntity.month.month);
    const year: Year = Year.create(appointmentEntity.year.year);
    const auditTrail: AuditTrail = AuditTrail.from(
      appointmentEntity.auditTrail.createdAt != null ? DateTime.fromString(appointmentEntity.auditTrail.createdAt) : null,
      appointmentEntity.auditTrail.createdBy != null ? UserId.of(appointmentEntity.auditTrail.createdBy) : null,
      appointmentEntity.auditTrail.updatedAt != null ? DateTime.fromString(appointmentEntity.auditTrail.updatedAt) : null,
      appointmentEntity.auditTrail.updatedBy != null ? UserId.of(appointmentEntity.auditTrail.updatedBy) : null
    );
    const appointmentId: AppointmentId = AppointmentId.of(appointmentEntity.id);
    let appointment: Appointment = AppointmentFactory.withId(appointmentId, day, month, year, auditTrail);
    return appointment;
  }

  public static ormToAppointmentDto(row: any): AppointmentDto {
    let dto = new AppointmentDto();
    dto.id = Number(row.id);
    dto.day = row.day;
    dto.month = row.month;
    dto.year = row.year;
    return dto;
  }
}