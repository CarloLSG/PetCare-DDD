import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';
import { UsersModule } from './users/users.module';
import { AppointmentModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: 'mysql://root:U2537s556@localhost:3306/petcare-ddd',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
          process.env.ENVIRONMENT == 'prod' ? 
          '**/infrastructure/persistence/entities/*{.ts,.js}' : 
          'dist/**/infrastructure/persistence/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
          process.env.ENVIRONMENT == 'prod' ? 
          'shared/infrastructure/persistence/migrations/*{.ts,.js}' :
          'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    OwnersModule,
    UsersModule,
    NotificationsModule,
    AppointmentModule
],
})
export class AppModule {}
