import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  loginIdentifierPattern,
  passwordPattern,
} from '../../../shared/constants/patterns';

@Injectable()
export class LoginFormService {
  private formBuilder = inject(FormBuilder);

  // Validators.pattern(loginIdentifierPattern)
  // Validators.pattern(passwordPattern)

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      loginIdentifier: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
}
