import { Component, OnInit } from '@angular/core';
import * as forRoot from '../shared/store/index';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from "rxjs";
import {Registration} from '../shared/models/index';
import { WebsocketService, WS } from '../shared/websocket/index';

export interface IMessage {
  id: number;
  text: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  private messages$: Observable<IMessage[]>;
  private counter$: Observable<number>;
  private texts$: Observable<string[]>;

  @Select(forRoot.RegistarationState.emailState) registration$: Observable<string>;

  constructor(private store: Store, private formBuilder: FormBuilder, private wsService: WebsocketService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.registration$.subscribe((val: string) =>this.registerForm.get('email').setValue(val));

    // get messages
    this.messages$ = this.wsService.on<IMessage[]>(WS.ON.MESSAGES);
    // get counter
    //this.counter$ = this.wsService.on<number>(WS.ON.COUNTER);

    // get texts
   // this.texts$ = this.wsService.on<string[]>(WS.ON.UPDATE_TEXTS);
  }

  /*public sendText(): void {
    if (this.registerForm.valid) {
      this.wsService.send(WS.SEND.SEND_TEXT, this.registerForm.value.email);
      this.registerForm.reset();
    }
  }

  public removeText(index: number): void {
    this.wsService.send(WS.SEND.REMOVE_TEXT, index);
  }*/

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.wsService.send(WS.ON.MESSAGES, {data:1});
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(new forRoot.SetRegistrationForm(this.registerForm.value)).subscribe(() => {
      console.log('Changed!');
    });
  }
}