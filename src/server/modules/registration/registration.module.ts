import {Module} from '@nestjs/common';
import {RegistrationController} from  './registration.controller';
import { registrationProviders } from './registration.providers';
import {DatabaseModule} from '../../modules/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [RegistrationController],
    providers: [
        ...registrationProviders
    ]
})
export class RegistrationModule {
}