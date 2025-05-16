import { Component, inject } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [AsyncPipe, ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  sessionService: SessionService = inject(SessionService);
  formBuilder: FormBuilder = inject(FormBuilder);

  private loginTrigger = new Subject<{ username: string; password: string }>();
  loginResult$ = this.loginTrigger.pipe(
    switchMap(({ username, password }) =>
      this.sessionService.login(username, password)
    )
  );

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.loginTrigger.next({ username, password });
  }
}
