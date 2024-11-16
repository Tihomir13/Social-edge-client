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

// export function notTodayValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     if (!control || !control.value) {
//       return null;
//     }

//     const { day, month, year } = control.value;

//     const today = new Date();
//     const isToday =
//       today.getDate() === day &&
//       today.getMonth() === month &&
//       today.getFullYear() === year;

//     return isToday ? { notToday: true } : null;
//   };
// }
