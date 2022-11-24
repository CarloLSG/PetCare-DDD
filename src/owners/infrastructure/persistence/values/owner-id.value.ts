import { PrimaryGeneratedColumn } from "typeorm";

export class OwnerIdValue {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public value: number;

  private constructor(value: string) {
    this.value = Number(value);
  }

  public static from(value: string): OwnerIdValue {
    return new OwnerIdValue(value);
  }
}