import { Module } from '@nestjs/common';
import { storageProvider } from './database.providers';
@Module({
    providers: [
        storageProvider
    ],
    exports: [
       storageProvider
    ]
})
export class DatabaseModule {}