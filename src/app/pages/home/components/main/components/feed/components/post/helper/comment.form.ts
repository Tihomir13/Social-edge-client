import { FormBuilder, FormGroup } from '@angular/forms';


export class GenerateCommentForm {
  constructor(private formBuilder: FormBuilder) {}

  generateCommentPost(): FormGroup {
    return this.formBuilder.group({
      comment: this.formBuilder.control<string>(''),
    });
  }
}
