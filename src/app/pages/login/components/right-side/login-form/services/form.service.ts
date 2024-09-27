import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private formBuilder: FormBuilder) {}

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      loginIdentifier: ['', Validators.required], // email or username
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
}
