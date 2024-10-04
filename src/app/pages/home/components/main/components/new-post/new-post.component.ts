import { Component } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  currentTags: string[] = [];

  addTag(value: string) {
    if (value != '') {
      this.currentTags = [...this.currentTags, '#' + value];
    }
  }

  onRemoveTag(index: number) {
    this.currentTags = this.currentTags.filter((_, i) => i !== index);
  }
}
