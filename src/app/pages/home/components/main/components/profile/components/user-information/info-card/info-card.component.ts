import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ProfileStateService } from '../../../services/profile-state.service';
import { UserInfoFormService } from './user-info-form.service';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent implements OnInit {
  userInfo = input<string | null | []>();
  alt = input<string>();
  imgSrc = input<string>();
  isUserAdding = false;
  state = inject(ProfileStateService);
  userInfoFormGroup!: FormGroup;
  generateUserInfoGroup = inject(UserInfoFormService);
  cdr = inject(ChangeDetectorRef)
  renderer = inject(Renderer2)

  newInfo = output();

  @ViewChild('input', { static: false }) input!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.isUserAdding && !target.closest('.form')) {
      this.onCancel();
    }
  }

  ngOnInit(): void {
    this.userInfoFormGroup = this.generateUserInfoGroup.generateUserInfoForm();
  }

  onAdd(): void {
    this.isUserAdding = true;

    this.focusInput()
  }

  onCancel(): void {
    this.isUserAdding = false;
  }

  focusInput(): void {
    this.cdr.detectChanges();

    if (this.input) {
      this.renderer.selectRootElement(this.input.nativeElement).focus();
    }
  }

  onSave() {
    if (this.userInfoFormGroup.valid) {
      const body: any = {
        value: this.userInfoFormGroup.value,
        infoType: this.alt(),
      };

      this.newInfo.emit(body);
    }
  }
}
