import { Component, inject, OnInit } from '@angular/core';
import { ShortenMonthPipe } from '../../shared/pipes/shorten-month.pipe';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ShortenMonthPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  date: Date = new Date();
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => this.date.getFullYear() - i
  );

  selectedDay!: number;
  selectedMonth!: number;
  selectedYear!: number;

  form!: FormGroup;

  get firstNameControl(): AbstractControl | null {
    return this.form.get('name.firstName');
  }

  get lastNameControl(): AbstractControl | null {
    return this.form.get('name.lastName');
  }

  get emailControl(): AbstractControl | null {
    return this.form.get('email');
  }

  get passwordGroupControl(): AbstractControl | null {
    return this.form.get('passwords');
  }

  get passwordControl(): AbstractControl | null {
    return this.form.get('passwords.password');
  }

  get confirmPasswordControl(): AbstractControl | null {
    return this.form.get('passwords.confirmPassword');
  }

  get isEmailValid(): boolean | undefined {
    return (
      this.emailControl?.value != '' &&
      this.emailControl?.invalid &&
      this.emailControl?.dirty
    );
  }

  get isConfirmPassValid(): boolean | undefined {
    const passwordGroup = this.passwordGroupControl;

    return (
      this.confirmPasswordControl?.value !== '' &&
      this.confirmPasswordControl?.dirty &&
      passwordGroup?.hasError('passwordsDoNotMatch')
    );
  }

  private formService = inject(FormService);

  ngOnInit(): void {
    this.selectedDay = this.date.getDate();
    this.selectedMonth = this.date.getMonth();
    this.selectedYear = this.date.getFullYear();

    this.form = this.formService.createRegisterForm(
      this.selectedDay,
      this.selectedMonth,
      this.selectedYear
    );
  }

  getDaysInMonth(): number[] {
    const daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    ).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  onMonthChange(): void {
    this.selectedMonth = Number(this.selectedMonth);
    this.adjustSelectedDay();
  }

  onYearChange(): void {
    this.adjustSelectedDay();
  }

  private adjustSelectedDay(): void {
    const daysInNewMonth = this.getDaysInMonth().length;
    if (this.selectedDay > daysInNewMonth) {
      this.selectedDay = daysInNewMonth;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
