import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

  formService = inject(FormService);

  ngOnInit(): void {
    this.form = this.formService.createLoginForm();
  }
}
