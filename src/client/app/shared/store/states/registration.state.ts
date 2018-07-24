/**
 * Created by PK on 16.06.2018.
 */
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {SetRegistrationForm, SetRegistrationState} from '../actions/registration.actions';
import {Observable, of} from 'rxjs';
import {tap, map} from 'rxjs/operators';
import {CommonService} from '../../services/index';
import {Registration} from '../../models/index';

@State({
    name: 'registration',
    defaults: {
        registerForm: {
            name: '',
            email: 'mike.anapa@gmail.com',
            password: ''
        }
    }
})
export class RegistarationState {

    @Selector() static emailState(state: {[key: string]: Registration}){
        return state.registerForm.email;
    }

    constructor(private readonly commonService: CommonService) {
    }

    @Action(SetRegistrationState)
    SetRegistrationState(ctx: StateContext<{ [key: string]: Registration }>, {payload}: SetRegistrationForm) {
        const data = {
            name: payload.name,
            email: payload.email,
            password: payload.password
        };
        return of(data).pipe(
            tap((vals: any) => {
                ctx.patchState({
                    registerForm: {
                        ...vals
                    }
                });
            })
        );
    }

    @Action(SetRegistrationForm)
    SetRegistrationForm(ctx: StateContext<{ [key: string]: Registration }>, {payload}: SetRegistrationForm) {
        return this.commonService.registration(payload).pipe(
            map(() => ctx.dispatch(new SetRegistrationState(payload)))
        );
    }
}

