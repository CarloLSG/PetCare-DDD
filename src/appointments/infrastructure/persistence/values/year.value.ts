import { Column } from 'typeorm';

export class YearValue {
  @Column('varchar', { name: 'year', length: 75, nullable: true })
  public year: string;

  private constructor(year: string) {
    this.year = year;
  }

  public static from(year: string): YearValue {
    return new YearValue(year);
  }
}