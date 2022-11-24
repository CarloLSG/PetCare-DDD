import { Column } from 'typeorm';

export class PasswordValue {
  @Column('varchar', { name: 'password', length: 75, nullable: true })
  public password: string;

  private constructor(password: string) {
    this.password = password;
  }

  public static from(password: string): PasswordValue {
    return new PasswordValue(password);
  }
}