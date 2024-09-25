import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsDoNotMatch: true };
    }
  };
}

export function usernameTakenValidator(usernames: string[]): ValidationErrors {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value;

    if (username && usernames.includes(username)) {
      return { usernameTaken: true };
    }

    return null;
  };
}