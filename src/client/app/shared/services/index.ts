/**
 * Created by PK on 23.07.2018.
 */
import {SocketService} from './socket.service';
import {CommonService} from './common.service';

export const services = [SocketService, CommonService];

export * from './common.service';
export * from './socket.service';