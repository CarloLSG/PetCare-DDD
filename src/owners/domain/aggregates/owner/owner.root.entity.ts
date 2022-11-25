import { AggregateRoot } from '@nestjs/cqrs';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { OwnerId } from './owner-id.value';
import { OwnerType } from './owner-type.enum';

export class Owner extends AggregateRoot {
  protected id: OwnerId;
  protected type: OwnerType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: OwnerType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): OwnerId {
    return this.id;
  }

  public getType(): OwnerType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: OwnerId) {
    this.id = id;
  }
}