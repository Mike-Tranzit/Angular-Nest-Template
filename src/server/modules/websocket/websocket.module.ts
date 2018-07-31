import { Module } from '@nestjs/common';
import {gateway} from './index';
@Module({
    imports: [],
    exports: [...gateway],
    providers: [...gateway]
})
export class WebsocketModule {}
