import { Column } from 'typeorm';

export class EmailValue {
  @Column('varchar', { name: 'email', length: 75, nullable: true })
  public email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public static from(email: string): EmailValue {
    return new EmailValue(email);
  }
}