import { OwnerType } from 'src/owners/domain/aggregates/client/owner-type.enum';
import { PersonRegistered } from 'src/owners/domain/events/person-registered.event';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { OwnerId } from './owner-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Email } from '../../../../shared/domain/values/email.value';
import { Password } from '../../../../shared/domain/values/password.value';
import { Owner } from './owner.root.entity';

export class Person extends Owner {
  private name: PersonName;
  private email: Email;
  private password: Password;

  public constructor(name: PersonName, email: Email, password: Password, auditTrail: AuditTrail) {
    super(OwnerType.PERSON, auditTrail);
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public register() {
    const event = new PersonRegistered(this.id.getValue(), this.name.getUserName(), this.email.getValue(), this.password.getValue());
    this.apply(event);
  }

  public getId(): OwnerId {
    return this.id;
  }

  public getName(): PersonName {
    return this.name;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: PersonName): void {
    this.name = name;
  }

  public changeEmail(email: Email): void {
    this.email = email;
  }

  public changePassword(password: Password): void {
    this.password = password;
  }
}