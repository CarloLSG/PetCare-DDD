import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterAppointmentRequest } from '../dtos/request/register-appointment-request.dto';
import { RegisterAppointmentResponse } from '../dtos/response/register-appointment-response.dto';
import { RegisterAppointmentValidator } from '../validators/register-appointment.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterAppointment } from '../messages/commands/register-appointment.command';
import { AppointmentRepository, APPOINTMENT_REPOSITORY } from 'src/appointments/domain/aggregates/client/appointment.repository';
import { Appointment } from 'src/appointments/domain/aggregates/client/appointment.entity';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class AppointmentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerAppointmentValidator: RegisterAppointmentValidator,
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async register(
    registerPersonRequest: RegisterAppointmentRequest,
  ): Promise<Result<AppNotification, RegisterAppointmentResponse>> {
    const registerPerson: RegisterAppointment = AppointmentMapper.dtoRequestToCommand(registerPersonRequest);
    const notification: AppNotification = await this.registerAppointmentValidator.validate(registerPerson);
    if (notification.hasErrors()) return Result.error(notification);
    const appointment: Appointment = await this.commandBus.execute(registerPerson);
    const response: RegisterAppointmentResponse = AppointmentMapper.domainToDtoResponse(appointment);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.appointmentRepository.getById(id);
  }
}