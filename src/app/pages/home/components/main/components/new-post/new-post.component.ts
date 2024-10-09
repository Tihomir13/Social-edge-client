import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { ArrayUtilityService } from '../../../../../../shared/services/utility/array-utility.service';
import { StatusPickerComponent } from './status-picker/status-picker.component';
import { statuses } from '../../../../../../shared/constants/arrays';
import { maxImageSize } from '../../../../../../shared/constants/settings';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [StatusPickerComponent, NgClass, NgStyle],
  providers: [ArrayUtilityService],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  isStatusPickerVisible: boolean = false;
  isCreatingNewPost: boolean = false;

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  currentTags: string[] = [];
  currentStatus: string = '';

  errorMsgTag: string = '';
  errorMsgPhoto: string = '';

  @ViewChild('textArea') textArea!: ElementRef;

  arrUtilService = inject(ArrayUtilityService);
  renderer = inject(Renderer2);

  onAddTag(value: string): void {
    if (value === '') {
      return;
    }

    const newTag = '#' + value;

    if (this.currentTags.includes(newTag)) {
      this.errorMsgTag = `You have already entered ${newTag}.`;
      return;
    }

    if (this.errorMsgTag != '') {
      this.errorMsgTag = '';
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
    const files = Array.from(event.target.files) as File[];

    files.forEach((file) => {
      const isDuplicate = this.selectedFiles.some(
        (selectedFile) =>
          selectedFile.name === file.name &&
          selectedFile.size === file.size &&
          selectedFile.lastModified === file.lastModified
      );

      if (isDuplicate) {
        this.errorMsgPhoto = 'This file has already been added.';
        return;
      }

      const validFileTypes = ['image/png', 'image/jpeg'];
      if (!validFileTypes.includes(file.type)) {
        this.errorMsgPhoto = 'Please, upload only PNG or JPEG images.';
        return;
      }

      const maxFileSize = maxImageSize * 1024 * 1024;
      if (file.size > maxFileSize) {
        this.errorMsgPhoto = `The image needs to be smaller than ${maxImageSize}MB.`;
        return;
      }

      if (this.errorMsgPhoto !== '') {
        this.errorMsgPhoto = '';
      }

      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        if (!this.imagePreviews.includes(previewUrl)) {
          this.imagePreviews.push(previewUrl);
        }
      };

      reader.readAsDataURL(file);
    });

    (event.target as HTMLInputElement).value = '';
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

  toggleStatusPicker(): void {
    this.isStatusPickerVisible = !this.isStatusPickerVisible;
  }

  onStatusPickerClose(isVisible: boolean): void {
    this.isStatusPickerVisible = isVisible;
  }

  changeStatus(index: number): void {
    const newStatus = statuses[index];
    this.currentStatus = newStatus.emoji;
    this.startCreatingNewPost();
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
    this.startCreatingNewPost();
  }

  startCreatingNewPost(): void {
    if (!this.isCreatingNewPost) {
      this.isCreatingNewPost = true;
      this.focusTextArea();
    }
  }

  focusTextArea(): void {
    setTimeout(() => {
      if (this.textArea) {
        this.renderer.selectRootElement(this.textArea.nativeElement).focus();
      }
    }, 1);
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
