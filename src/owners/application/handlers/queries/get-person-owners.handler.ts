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
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      clients
    WHERE
      type = 'P'
    ORDER BY
      last_name, first_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const personClients: PersonOwnerDto[] = rows.map(function (row: any) {
      return PersonMapper.ormToPersonOwnerDto(row);
    });
    return personClients;
  }
}