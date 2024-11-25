import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NewPostFormServiceService {
  newPostFormGroup = signal<FormGroup>(new FormGroup({}));

  setFormGroup(formGroup: FormGroup) {
    this.newPostFormGroup.set(formGroup);
  }
}
