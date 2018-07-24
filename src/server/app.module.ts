import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { RegistrationModule } from './modules/registration/registration.module';

@Module({
  imports: [DatabaseModule, RegistrationModule],
  controllers: [],
  providers: []
})
export class AppModule {}