import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { PersonOwnerDto } from '../../dtos/response/person-owner.dto';
import { GetPersonOwners } from '../../messages/queries/get-person-owners.query';
import { PersonMapper } from '../../mappers/person.mapper';

@QueryHandler(GetPersonOwners)
export class GetPersonOwnersHandler implements IQueryHandler<GetPersonOwners> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetPersonOwners) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      user_name as userName,
      email,
      password
    FROM 
      owners
    WHERE
      type = 'P'
    ORDER BY
      id;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const personOwners: PersonOwnerDto[] = rows.map(function (row: any) {
      return PersonMapper.ormToPersonOwnerDto(row);
    });
    return personOwners;
  }
}