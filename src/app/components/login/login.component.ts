import { Component, inject } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  sessionService: SessionService = inject(SessionService);
  formBuilder: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.sessionService.login(username, password);
  }
}
