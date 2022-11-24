import { Column } from 'typeorm';

export class UserNameValue {
  @Column('varchar', { name: 'user_name', length: 75, nullable: true })
  public userName: string;

  private constructor(userName: string) {
    this.userName = userName;
  }

  public static from(userName: string): UserNameValue {
    return new UserNameValue(userName);
  }
}