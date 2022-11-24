import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRegisteredHandler } from '../notifications/application/handlers/events/person-registered.handler';
import { GetPersonOwnersHandler } from './application/handlers/queries/get-person-owners.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { OwnerEntity } from './infrastructure/persistence/entities/owner.entity';
import { PersonEntity } from './infrastructure/persistence/entities/person.entity';
import { PersonController } from './interface/rest/person.controller';
import { PersonEntityRepository } from './infrastructure/persistence/repositories/person.repository';
import { PERSON_REPOSITORY } from './domain/aggregates/client/person.repository';

export const CommandHandlers = [RegisterPersonHandler];
export const EventHandlers = [PersonRegisteredHandler];
export const QueryHandlers = [GetPersonOwnersHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([OwnerEntity, PersonEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [PersonController],
  providers: [
    { useClass: PersonEntityRepository, provide: PERSON_REPOSITORY },
    PersonApplicationService,
    RegisterPersonValidator,
    PersonEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class OwnersModule {}