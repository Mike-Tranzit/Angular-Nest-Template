import {Module} from '@nestjs/common';
import {RegistrationModule} from './modules/registration/registration.module';
import {Connection} from 'typeorm';
import {RouterModule, Routes} from 'nest-router';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigurationService} from './modules/common/services/index';

const routes: Routes = [{
    path: '/r',
    module: RegistrationModule
}];



@Module({
    imports: [
        RegistrationModule,
        RouterModule.forRoutes(routes),
        TypeOrmModule.forRoot()
    ],
    controllers: [],
    providers: [
        {
            provide: ConfigurationService,
            useFactory: async () => {
                const environment = process.env.NODE_ENV || 'prod';
                return new ConfigurationService(__dirname + '/environments/' + `environment.${environment}.env`);
            }
        }
    ]
})
export class AppModule {

    static PORT: number | string;
    static HOST: string;

    constructor(
        private readonly connection: Connection,
        private readonly _config: ConfigurationService
    ) {
        AppModule.PORT = AppModule.normalizePort( _config.get('PORT'));
        AppModule.HOST =  _config.get('HOST');
    }

    private static normalizePort(param: string | number): string | number {
        const paramPort: number = typeof param === 'string' ? parseInt(param, 10) : param;
        if(isNaN(paramPort)) return param;
        else if (paramPort >= 0) return paramPort;
    }


}