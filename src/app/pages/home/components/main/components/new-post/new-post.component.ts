import { Component, HostListener, inject } from '@angular/core';

import { ArrayUtilityService } from '../../../../../../shared/services/utility/array-utility.service';
import { StatusPickerComponent } from './status-picker/status-picker.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [StatusPickerComponent],
  providers: [ArrayUtilityService],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  isStatusPickerVisible: boolean = false;

  currentTags: string[] = [];
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  arrUtilService = inject(ArrayUtilityService);

  onAddTag(value: string): void {
    if (value === '') {
      return;
    }

    const newTag = '#' + value;

    if (this.currentTags.includes(newTag)) {
      return;
    }

    this.currentTags = [...this.currentTags, '#' + value];
  }

  onRemoveTag(index: number): void {
    this.currentTags = this.arrUtilService.removeElemById(
      this.currentTags,
      index
    );
  }

  onAddFile(event: any): void {
    this.selectedFiles = Array.from(event.target.files);

    this.selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };

      const uniqueImgPrev = [...new Set(this.imagePreviews)];
      this.imagePreviews = uniqueImgPrev;
      reader.readAsDataURL(file);
    });
  }

  onRemoveFile(index: number): void {
    this.imagePreviews = this.arrUtilService.removeElemById(
      this.imagePreviews,
      index
    );

    this.selectedFiles = this.arrUtilService.removeElemById(
      this.selectedFiles,
      index
    );
  }

  toggleStatusPicker() {
    this.isStatusPickerVisible = !this.isStatusPickerVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.isStatusPickerVisible && !target.closest('.status-container')) {
      this.isStatusPickerVisible = false;
    }
  }

  // submitPost() {
  //   if (this.selectedFiles.length && this.postText) {
  //     const formData = new FormData();
  //     this.selectedFiles.forEach(file => {
  //       formData.append('images', file);
  //     });
  //     formData.append('text', this.postText);

  //     // Изпращане на всички файлове и текст към бекенда
  //     // this.http.post('your-backend-url', formData).subscribe();
  //   } else {
  //     alert('Please add some text or images before submitting!');
  //   }
  // }
}
