import { Column } from 'typeorm';

export class OwnerIdValue {
  @Column('bigint', { name: 'owner_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): OwnerIdValue  {
    return new OwnerIdValue(value);
  }
}