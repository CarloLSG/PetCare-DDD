import { AggregateRoot } from '@nestjs/cqrs';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { Email } from '../../../../shared/domain/values/email.value';
import { Password } from '../../../../shared/domain/values/password.value';
import { Appointment } from './appointment.entity';
import { Day } from 'src/shared/domain/values/day.value';
import { Month } from 'src/shared/domain/values/month.value';
import { Year } from 'src/shared/domain/values/year.value';

describe('Appointment', () => {
  let appointment: Appointment;
  let appointmentDay: Day;
  let appointmentMonth: Month;
  let appointmentYear: Year;
  let auditTrail: AuditTrail;

  beforeEach(() => {
    appointmentDay = Day.create('23');
    appointmentMonth = Month.create('11');
    appointmentYear = Year.create('2022');
  });

  describe('register', () => {
    it('should be registered', () => {
      const appointmentday: string = '23';
      const appointmentmonth: string = '11';
      const appointmentyear: string = '2022';

      let day: Day = Day.create(appointmentday);
      let month: Month = Month.create(appointmentmonth);
      let year: Year = Year.create(appointmentyear);

      let appointment: Appointment = new Appointment(day, month, year, auditTrail);
      
      expect(appointment.getDay().getValue()).toBe(appointmentDay.getValue());
      expect(appointment.getMonth().getValue()).toBe(appointmentMonth.getValue());
      expect(appointment.getYear().getValue()).toBe(appointmentYear.getValue());
    });
  });
});