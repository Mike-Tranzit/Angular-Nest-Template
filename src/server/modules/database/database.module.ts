import { Module, Global } from '@nestjs/common';
import { storageProvider } from './database.providers';

@Global()
@Module({
    providers: [
        storageProvider
    ],
    exports: [
       storageProvider
    ]
})
export class DatabaseModule {}