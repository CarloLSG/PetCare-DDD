import { Column } from 'typeorm';

export class MonthValue {
  @Column('varchar', { name: 'month', length: 75, nullable: true })
  public month: string;

  private constructor(month: string) {
    this.month = month;
  }

  public static from(month: string): MonthValue {
    return new MonthValue(month);
  }
}