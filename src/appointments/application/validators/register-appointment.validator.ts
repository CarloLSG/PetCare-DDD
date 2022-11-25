import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterAppointment } from '../messages/commands/register-appointment.command';
import { AppointmentRepository, APPOINTMENT_REPOSITORY } from 'src/appointments/domain/aggregates/client/appointment.repository';
import { Appointment } from 'src/appointments/domain/aggregates/client/appointment.entity';

@Injectable()
export class RegisterAppointmentValidator {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private appointmentRepository: AppointmentRepository,
  ) {
  }

  public async validate(registerAppointment: RegisterAppointment,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const day: string = registerAppointment.day ? registerAppointment.day.trim() : '';
    if (day.length <= 0) {
      notification.addError('day is required', null);
    }
    const month: string = registerAppointment.month ? registerAppointment.month.trim() : '';
    if (month.length <= 0) {
      notification.addError('month is required', null);
    }
    const year: string = registerAppointment.year ? registerAppointment.year.trim() : '';
    if (year.length <= 0) {
      notification.addError('year is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const appointment: Appointment = await this.appointmentRepository.getByDay(day);
    if (appointment != null) notification.addError('day is taken', null);
    
    return notification;
  }
}