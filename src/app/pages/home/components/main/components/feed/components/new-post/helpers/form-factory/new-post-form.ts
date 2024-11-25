import { FormBuilder, FormGroup } from '@angular/forms';

import postStatusModel from '../../models/post-status.model';

export class GenerateNewPostForm {
  constructor(private formBuilder: FormBuilder) {}

  generateNewPostForm(): FormGroup {
    return this.formBuilder.group({
      title: this.formBuilder.control<string>(''),
      text: this.formBuilder.control<string>(''),
      tags: this.formBuilder.array<string[] | []>([]),
      images: this.formBuilder.array<File[] | []>([]),
      status: this.formBuilder.control<postStatusModel | null>(null),
    });
  }
}
