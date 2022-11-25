import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { AppointmentId } from '../aggregates/client/appointment-id.value';
import { Day } from 'src/shared/domain/values/day.value';
import { Month } from 'src/shared/domain/values/month.value';
import { Year } from 'src/shared/domain/values/year.value';
import { Appointment } from '../aggregates/client/appointment.entity';

export class AppointmentFactory {
  public static withId(id: AppointmentId, day: Day, month: Month, year: Year, auditTrail: AuditTrail): Appointment {
    let appointment: Appointment = new Appointment(day, month, year, auditTrail);
    appointment.changeId(id);
    return appointment;
  }

  public static from(day: Day, month: Month, year: Year, auditTrail: AuditTrail): Appointment {
    return new Appointment(day, month, year, auditTrail);
  }
}