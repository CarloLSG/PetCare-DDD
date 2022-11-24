import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { OwnerType } from '../../../domain/aggregates/client/owner-type.enum';

@Entity('owners')
@TableInheritance({ column: 'type', })
export class OwnerEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailValue, { prefix: false })
  public auditTrail: AuditTrailValue;

  @Column({ name: 'type', type: 'enum', enum: OwnerType, default: OwnerType.PERSON })
  readonly type: OwnerType;
}