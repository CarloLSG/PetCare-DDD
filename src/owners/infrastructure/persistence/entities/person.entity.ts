import { ChildEntity, Column } from 'typeorm';
import { OwnerType } from '../../../domain/aggregates/client/owner-type.enum';
import { EmailValue } from '../values/email.value';
import { PasswordValue } from '../values/password.value';
import { UserNameValue } from '../values/user-name.value';
import { OwnerEntity } from './owner.entity';

@ChildEntity(OwnerType.PERSON)
export class PersonEntity extends OwnerEntity {
  @Column((type)=>UserNameValue, {prefix:false})
  public username: UserNameValue;

  @Column((type)=>EmailValue, {prefix:false})
  public email: EmailValue;

  @Column((type)=>PasswordValue, {prefix:false})
  public password: PasswordValue;
}