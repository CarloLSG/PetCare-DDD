import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterPerson } from '../messages/commands/register-person.command';
import { PersonRepository, PERSON_REPOSITORY } from 'src/owners/domain/aggregates/client/person.repository';
import { Person } from 'src/owners/domain/aggregates/client/person.entity';

@Injectable()
export class RegisterPersonValidator {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private personRepository: PersonRepository,
  ) {
  }

  public async validate(registerPerson: RegisterPerson,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const userName: string = registerPerson.userName ? registerPerson.userName.trim() : '';
    if (userName.length <= 0) {
      notification.addError('userName is required', null);
    }
    const email: string = registerPerson.email ? registerPerson.email.trim() : '';
    if (email.length <= 0) {
      notification.addError('email is required', null);
    }
    const password: string = registerPerson.password ? registerPerson.password.trim() : '';
    if (password.length <= 0) {
      notification.addError('password is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const person: Person = await this.personRepository.getByEmail(email);
    if (person != null) notification.addError('email is taken', null);
    
    return notification;
  }
}