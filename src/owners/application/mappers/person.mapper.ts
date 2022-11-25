import { Person } from 'src/owners/domain/aggregates/owner/person.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterPerson } from '../messages/commands/register-person.command';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { Password } from 'src/shared/domain/values/password.value';
import { Email } from 'src/shared/domain/values/email.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { PersonFactory } from 'src/owners/domain/factories/person.factory';
import { PersonOwnerDto } from '../dtos/response/person-owner.dto';
import { OwnerId } from 'src/owners/domain/aggregates/owner/owner-id.value';
import { RegisterPersonRequest } from '../dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../dtos/response/register-person-response.dto';
import { PersonEntity } from 'src/owners/infrastructure/persistence/entities/person.entity';
import { PersonNameValue } from 'src/owners/infrastructure/persistence/values/person-name.value';
import { EmailValue } from 'src/owners/infrastructure/persistence/values/email.value';
import { PasswordValue } from 'src/owners/infrastructure/persistence/values/password.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';

export class PersonMapper {
  public static dtoRequestToCommand(registerPersonRequest: RegisterPersonRequest) {
    return new RegisterPerson(
      registerPersonRequest.userName,
      registerPersonRequest.email,
      registerPersonRequest.password,
    );
  }

  public static domainToDtoResponse(person: Person) {
    return new RegisterPersonResponse(
      person.getId().getValue(),
      person.getName().getUserName(),
      person.getEmail().getValue(),
      person.getPassword().getValue(),
      person.getAuditTrail().getCreatedAt().format(),
      person.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterPerson, userId: number): Person {
    const personName: PersonName = PersonName.create(command.userName);
    const email: Email = Email.create(command.email);
    const password: Password = Password.create(command.password);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let person: Person = PersonFactory.from(personName, email, password, auditTrail);
    return person;
  }

  public static domainToEntity(person: Person): PersonEntity {
    const personEntity: PersonEntity = new PersonEntity();
    personEntity.username = PersonNameValue.from(person.getName().getUserName());
    personEntity.email = EmailValue.from(person.getEmail().getValue());
    personEntity.password = PasswordValue.from(person.getPassword().getValue());
    const createdAt: string = person.getAuditTrail() != null && person.getAuditTrail().getCreatedAt() != null ? person.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = person.getAuditTrail() != null && person.getAuditTrail().getCreatedBy() != null ? person.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = person.getAuditTrail() != null && person.getAuditTrail().getUpdatedAt() != null ? person.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = person.getAuditTrail() != null && person.getAuditTrail().getUpdatedBy() != null ? person.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    personEntity.auditTrail = auditTrailValue;
    return personEntity;
  }

  public static entityToDomain(personEntity: PersonEntity): Person {
    if (personEntity == null) return null;
    const personName: PersonName = PersonName.create(personEntity.username.userName);
    const email: Email = Email.create(personEntity.email.email);
    const password: Password = Password.create(personEntity.password.password);
    const auditTrail: AuditTrail = AuditTrail.from(
      personEntity.auditTrail.createdAt != null ? DateTime.fromString(personEntity.auditTrail.createdAt) : null,
      personEntity.auditTrail.createdBy != null ? UserId.of(personEntity.auditTrail.createdBy) : null,
      personEntity.auditTrail.updatedAt != null ? DateTime.fromString(personEntity.auditTrail.updatedAt) : null,
      personEntity.auditTrail.updatedBy != null ? UserId.of(personEntity.auditTrail.updatedBy) : null
    );
    const ownerId: OwnerId = OwnerId.of(personEntity.id);
    let person: Person = PersonFactory.withId(ownerId, personName, email, password, auditTrail);
    return person;
  }

  public static ormToPersonOwnerDto(row: any): PersonOwnerDto {
    let dto = new PersonOwnerDto();
    dto.id = Number(row.id);
    dto.userName = row.userName;
    dto.email = row.email;
    dto.password = row.password;
    return dto;
  }
}