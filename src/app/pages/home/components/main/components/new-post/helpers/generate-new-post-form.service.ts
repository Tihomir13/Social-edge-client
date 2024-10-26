import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GenerateNewPostFormService {
  formBuilder = inject(FormBuilder);

  generateNewPostForm(): FormGroup {
    return this.formBuilder.group({
      title: this.formBuilder.control(''),
      content: this.formBuilder.control(''),
      tags: this.formBuilder.array([]),
      images: this.formBuilder.array([]),
    });
  }
}
