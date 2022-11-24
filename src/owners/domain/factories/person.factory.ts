import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { PersonName } from '../../../shared/domain/values/person-name.value';
import { Person } from '../aggregates/client/person.entity';
import { OwnerId } from '../aggregates/client/owner-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';
import { Email } from '../../../shared/domain/values/email.value';
import { Password } from '../../../shared/domain/values/password.value';

export class PersonFactory {
  public static withId(id: OwnerId, name: PersonName, email: Email, password: Password, auditTrail: AuditTrail): Person {
    let person: Person = new Person(name, email, password, auditTrail);
    person.changeId(id);
    return person;
  }

  public static from(name: PersonName, email: Email, password: Password, auditTrail: AuditTrail): Person {
    return new Person(name, email, password, auditTrail);
  }
}