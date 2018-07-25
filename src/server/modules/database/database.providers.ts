import * as orm from 'typeorm';

import { DB_CONNECTION_TOKEN, DB_CONFIG as config } from '../../server.constants';

export const storageProvider = {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => orm.createConnection({
        type: 'mysql',
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        username: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        synchronize: true,
        logging: false,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
    }),
};