import { Person } from "./person.entity";

export const PERSON_REPOSITORY = 'PersonRepository';

export interface PersonRepository {
  create(person: Person): Promise<Person>;
  update(person: Person): Promise<Person>;
  delete(personId: number): Promise<boolean>;
  getById(id: number): Promise<Person>;
  getByEmail(email: string): Promise<Person>;
  getByPassword(password: string): Promise<Person>;
}