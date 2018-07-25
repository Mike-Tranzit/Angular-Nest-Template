/**
 * Created by PK on 24.07.2018.
 */
import { Connection } from 'typeorm';
import { UserEntity } from './entity/user.entity';

export const registrationProviders = [
    {
        provide: 'UserRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(UserEntity),
        inject: ['DbConnectionToken'],
    },
];