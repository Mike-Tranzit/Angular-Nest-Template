/**
 * Created by PK on 16.06.2018.
 */
import {Registration} from '../../models/index';

export class SetRegistrationForm {
    static readonly type = '[Registration] SetForm';
    constructor(public readonly payload: Registration) {}
}

export class SetRegistrationState {
    static readonly type = '[Registration] SetFormState';
    constructor(public readonly payload: Registration) {}
}