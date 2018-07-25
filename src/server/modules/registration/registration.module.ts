import {Module} from '@nestjs/common';
import {RegistrationController} from  './registration.controller';
import {services} from '../common/services/index';
import {TypeOrmModule} from '@nestjs/typeorm';
import {entity} from './entity/index';

@Module({
    imports: [
        TypeOrmModule.forFeature([...entity]),
    ],
    controllers: [RegistrationController],
    exports: [ ...services],
    providers: [
        ...services
    ]
})
export class RegistrationModule {
}