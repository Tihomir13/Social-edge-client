import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { LoginRequestsService } from '../../../services/login-requests.service';
import { LoginFormService } from '../../../services/login-form.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [LoginFormService, LoginRequestsService, HttpClient],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

  formService = inject(LoginFormService);
  reqService = inject(LoginRequestsService);

  ngOnInit(): void {
    this.form = this.formService.createLoginForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);

      this.reqService.loginUser(this.form.value).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
    }
  }
}
