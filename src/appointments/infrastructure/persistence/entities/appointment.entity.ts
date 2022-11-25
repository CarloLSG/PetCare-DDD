import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { DayValue } from '../values/day.value';
import { MonthValue } from '../values/month.value';
import { YearValue } from '../values/year.value';

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailValue, { prefix: false })
  public auditTrail: AuditTrailValue;

  @Column((type)=>DayValue, {prefix:false})
  public day: DayValue;

  @Column((type)=>MonthValue, {prefix:false})
  public month: MonthValue;

  @Column((type)=>YearValue, {prefix:false})
  public year: YearValue;
}