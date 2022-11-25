import { AggregateRoot } from '@nestjs/cqrs';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { Day } from 'src/shared/domain/values/day.value';
import { Month } from 'src/shared/domain/values/month.value';
import { Year } from 'src/shared/domain/values/year.value';
import { AppoimentRegistered } from '../../events/appoiment-registered.event';
import { AppointmentId } from './appointment-id.value';

export class Appointment extends AggregateRoot {
  protected id: AppointmentId;
  protected day: Day;
  protected month: Month;
  protected year: Year;
  protected readonly auditTrail: AuditTrail;

  public constructor(day: Day, month: Month, year: Year, auditTrail: AuditTrail) {
    super();
    this.day = day;
    this.month = month;
    this.year = year;
    this.auditTrail = auditTrail;
  }

  public register() {
    const event = new AppoimentRegistered(this.id.getValue(), this.day.getValue(), this.month.getValue(), this.year.getValue());
    this.apply(event);
  }

  public getId(): AppointmentId {
    return this.id;
  }

  public getDay(): Day {
    return this.day;
  }

  public getMonth(): Month {
    return this.month;
  }

  public getYear(): Year {
    return this.year;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: AppointmentId) {
    this.id = id;
  }

  public changeDay(day: Day): void {
    this.day = day;
  }

  public changeMonth(month: Month): void {
    this.month = month;
  }

  public changeYear(year: Year): void {
    this.year = year;
  }
}