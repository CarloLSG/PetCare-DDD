import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterAppointmentValidator } from './application/validators/register-appointment.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRegisteredHandler } from '../notifications/application/handlers/events/person-registered.handler';
import { GetAppointmentsHandler } from './application/handlers/queries/get-appointments.handler';
import { AppointmentApplicationService } from './application/services/appointment-application.service';
import { RegisterAppointmentHandler } from './application/handlers/commands/register-appointment.handler';
import { AppointmentEntity } from './infrastructure/persistence/entities/appointment.entity';
import { AppointmentController } from './interface/rest/appointment.controller';
import { AppointmentEntityRepository } from './infrastructure/persistence/repositories/appointment.repository';
import { APPOINTMENT_REPOSITORY } from './domain/aggregates/client/appointment.repository';

export const CommandHandlers = [RegisterAppointmentHandler];
export const EventHandlers = [PersonRegisteredHandler];
export const QueryHandlers = [GetAppointmentsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([AppointmentEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [AppointmentController],
  providers: [
    { useClass: AppointmentEntityRepository, provide: APPOINTMENT_REPOSITORY },
    AppointmentApplicationService,
    RegisterAppointmentValidator,
    AppointmentEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AppointmentModule {}