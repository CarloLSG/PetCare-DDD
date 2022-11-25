import { Column } from 'typeorm';

export class DayValue {
  @Column('varchar', { name: 'day', length: 75, nullable: true })
  public day: string;

  private constructor(day: string) {
    this.day = day;
  }

  public static from(day: string): DayValue {
    return new DayValue(day);
  }
}