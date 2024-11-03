import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { passwordMatchValidator } from '../validators/validators';

@Injectable()
export class RegisterFormService {
  private formBuilder = inject(FormBuilder);

  createRegisterForm(
    selectedDay: number,
    selectedMonth: number,
    selectedYear: number
  ): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      username: ['', Validators.required],
      birthday: this.formBuilder.group({
        day: [selectedDay, Validators.required],
        month: [selectedMonth, Validators.required],
        year: [selectedYear, Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatchValidator() }
      ),
    });
  }
}
