import {Module} from '@nestjs/common';
import {DatabaseModule} from './modules/database/database.module';
import {RegistrationModule} from './modules/registration/registration.module';
import {services} from './modules/common/services/index';
import {RouterModule, Routes} from 'nest-router';

 const routes: Routes = [{
    path: '/registration',
    module: RegistrationModule
}];

@Module({
    imports: [DatabaseModule, RegistrationModule, RouterModule.forRoutes(routes)],
    controllers: [],
    providers: [...services]
})
export class AppModule {
}