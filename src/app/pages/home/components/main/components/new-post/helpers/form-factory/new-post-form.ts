import { inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import postStatusModel from '../../models/post-status.model';

export class GenerateNewPostForm {
  formBuilder = inject(FormBuilder);

  generateNewPostForm(): FormGroup {
    return this.formBuilder.group({
      title: this.formBuilder.control<string | null>(null),
      content: this.formBuilder.control<string | null>(null),
      tags: this.formBuilder.array<string[] | []>([]),
      images: this.formBuilder.array<File[] | []>([]),
      status: this.formBuilder.control<postStatusModel | null>(null),
    });
  }
}