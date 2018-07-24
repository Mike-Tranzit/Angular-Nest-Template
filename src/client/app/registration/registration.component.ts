import { Component, OnInit } from '@angular/core';
import * as forRoot from '../shared/store/index';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from "rxjs";
import {Registration} from '../shared/models/index';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  @Select(forRoot.RegistarationState.emailState) registration$: Observable<string>;

  constructor(private store: Store, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.registration$.subscribe((val: string) =>this.registerForm.get('email').setValue(val));

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(new forRoot.SetRegistrationForm(this.registerForm.value)).subscribe(() => {
      console.log('Changed!');
    });
  }
}