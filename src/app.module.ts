import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnersModule } from './owners/owners.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';

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
    TransactionsModule,
    AccountsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
