import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { ArrayUtilityService } from '../../../../../../shared/services/utility/array-utility.service';
import { StatusPickerComponent } from './status-picker/status-picker.component';
import { statuses } from '../../../../../../shared/constants/arrays';
import { maxImageSize } from '../../../../../../shared/constants/settings';

import * as nsfwjs from 'nsfwjs';
import { ModalService } from '../../../shared/services/modal.service';
import { GenerateNewPostFormService } from './helpers/generate-new-post-form.service';
import { NewPostStateService } from './helpers/new-post-state.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [StatusPickerComponent, ReactiveFormsModule, NgClass, NgStyle],
  providers: [ArrayUtilityService],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent {
  newPostFormGroup = input<FormGroup>();

  get tags(): FormArray {
    return this.newPostFormGroup()?.get('tags') as FormArray;
  }

  get imagesFiles(): FormArray {
    return this.newPostFormGroup()?.get('images') as FormArray;
  }

  isStatusPickerVisible: boolean = false;

  imagePreviews: string[] = [];

  currentTags: string[] = [];
  currentStatus: string = '';

  errorMsgTag: string = '';
  errorMsgPhoto: string = '';

  @ViewChild('textArea', { static: false }) textArea!: ElementRef;
  @ViewChild('inputFile', { static: false }) inputFile!: ElementRef;

  arrUtilService = inject(ArrayUtilityService);
  private renderer = inject(Renderer2);
  private elRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private formService = inject(GenerateNewPostFormService);
  private modalService = inject(ModalService);
  private formBuilder = inject(FormBuilder);
  newPostState = inject(NewPostStateService);

  onAddTag(tag: string): void {
    if (tag === '') {
      return;
    }

    const newTag = '#' + tag;

    if (this.tags.value.includes(newTag)) {
      this.errorMsgTag = `You have already entered ${newTag}.`;
      return;
    }

    if (this.errorMsgTag != '') {
      this.errorMsgTag = '';
    }

    this.tags.push(this.formBuilder.control('#' + tag));
  }

  onRemoveTag(index: number): void {
    this.tags.removeAt(index);
  }

  onAddFile(event: any): void {
    const files = Array.from(event.target.files) as File[];

    files.forEach(async (file) => {
      const isDuplicate = this.imagesFiles.value.some(
        (selectedFile: File) =>
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

      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = reader.result as string;

        image.onload = async () => {
          const model = await nsfwjs.load();
          const predictions = await model.classify(image);

          const nsfwResult = predictions.find(
            (p) => p.className === 'Porn' || p.className === 'Hentai'
          );

          if (nsfwResult && nsfwResult.probability > 0.05) {
            this.errorMsgPhoto =
              'NSFW content detected. Please, upload appropriate images.';
            return;
          }

          if (this.errorMsgPhoto !== '') {
            this.errorMsgPhoto = '';
          }

          this.imagesFiles.push(this.formBuilder.control(file));

          const previewUrl = reader.result as string;
          if (!this.imagePreviews.includes(previewUrl)) {
            this.imagePreviews.push(previewUrl);
          }
        };
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

    this.imagesFiles.removeAt(index);
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
    this.newPostState.toggleNewPost(true);
    this.cdr.detectChanges();
    this.inputFile.nativeElement.click();
  }

  startCreatingNewPost(): void {
    if (!this.newPostState.isCreatingNewPost()) {
      this.newPostState.toggleNewPost(true);

      this.focusTextArea();

      const listener = this.renderer.listen(
        'document',
        'click',
        (event: Event) => {
          if (this.elRef.nativeElement.contains(event.target)) {
            return;
          }

          const isTitleEmpty = this.newPostFormGroup()!.value.title;
          const isTextEmpty = this.newPostFormGroup()!.value.content;
          const isTagsEmpty = this.newPostFormGroup()!.value.tags;
          const isImagesEmpty = this.newPostFormGroup()!.value.images;

          if (
            isTitleEmpty === '' &&
            isTextEmpty === '' &&
            isTagsEmpty.length === 0 &&
            isImagesEmpty.length === 0
          ) {
            this.newPostState.toggleNewPost();
            this.newPostState.removeGlobalClickListener();
            return;
          } else {
            this.modalService.toggleModal();
          }
        }
      );
      this.newPostState.setGlobalClickListener(listener);
    }
  }

  focusTextArea(): void {
    this.cdr.detectChanges();

    if (this.textArea) {
      this.renderer.selectRootElement(this.textArea.nativeElement).focus();
    }
  }

  onSubmit() {}

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
