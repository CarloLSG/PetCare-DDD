import { Column } from 'typeorm';

export class PersonNameValue {
  @Column('varchar', { name: 'user_name', length: 75, nullable: true })
  public userName: string;

  private constructor(userName: string) {
    this.userName = userName;
  }

  public static from(userName: string): PersonNameValue {
    return new PersonNameValue(userName);
  }
}