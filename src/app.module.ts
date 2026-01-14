import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { Shift } from './shifts/shift.model';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ShiftsModule,
    AssignmentsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'military',
      models: [User, Shift],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
