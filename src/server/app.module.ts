import {Module} from '@nestjs/common';
import {RegistrationModule} from './modules/registration/registration.module';
import { Connection } from 'typeorm';
import {RouterModule, Routes} from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';

 const routes: Routes = [{
    path: '/r',
    module: RegistrationModule
}];

@Module({
    imports: [RegistrationModule, RouterModule.forRoutes(routes), TypeOrmModule.forRoot()],
    controllers: []
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }
}