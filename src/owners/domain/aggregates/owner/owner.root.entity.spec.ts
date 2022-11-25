import { AggregateRoot } from '@nestjs/cqrs';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { PersonName } from 'src/shared/domain/values/person-name.value';
import { Email } from '../../../../shared/domain/values/email.value';
import { Password } from '../../../../shared/domain/values/password.value';
import { OwnerType } from './owner-type.enum';
import { PersonFactory } from '../../factories/person.factory';
import { Person } from "./person.entity";
import { Owner } from './owner.root.entity';
import { OwnerId } from './owner-id.value';

describe('Person', () => {
  let owner: Owner;
  let personId: OwnerId;
  let personName: PersonName;
  let personEmail: Email;
  let personPassword: Password;
  let auditTrail: AuditTrail;

  beforeEach(() => {
    personId = OwnerId.of(1),
    personName = PersonName.create('Fabrizzio');
    personEmail = Email.create('fab@gmail.com');
    personPassword = Password.create('fabito');
  });

  describe('register', () => {
    it('should be registered', () => {
      const personname: string = 'Fabrizzio';
      const personemail: string = 'fab@gmail.com';
      const personpassword: string = 'fabito';

      let name: PersonName = PersonName.create(personname);
      let email: Email = Email.create(personemail);
      let password: Password = Password.create(personpassword);

      let person: Person = new Person(name, email, password, auditTrail);
      person.changeId(personId);
      
      expect(person.getName().getUserName()).toBe(personName.getUserName());
      expect(person.getEmail().getValue()).toBe(personEmail.getValue());
      expect(person.getPassword().getValue()).toBe(personPassword.getValue());
    });
  });
});
