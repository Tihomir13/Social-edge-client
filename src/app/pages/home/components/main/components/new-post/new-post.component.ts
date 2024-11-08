import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
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

import { UtilityService } from '../../../../../../shared/services/utility/array-utility.service';
import { StatusPickerComponent } from './status-picker/status-picker.component';
import { statuses } from '../../../../../../shared/constants/arrays';
import { maxImageSize } from '../../../../../../shared/constants/settings';

import * as nsfwjs from 'nsfwjs';
import { ModalService } from '../../../shared/services/modal.service';
import { NewPostStateService } from './services/new-post-state.service';
import { NewPostRequestsService } from './services/new-post-requests.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    StatusPickerComponent,
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    HttpClientModule,
  ],
  providers: [UtilityService, NewPostRequestsService],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent implements OnDestroy {
  newPostFormGroup = input<FormGroup>();

  get tags(): FormArray {
    return this.newPostFormGroup()?.get('tags') as FormArray;
  }

  get imagesFiles(): FormArray {
    return this.newPostFormGroup()?.get('images') as FormArray;
  }

  @ViewChild('textArea', { static: false }) textArea!: ElementRef;
  @ViewChild('inputFile', { static: false }) inputFile!: ElementRef;

  arrUtilService = inject(UtilityService);
  private renderer = inject(Renderer2);
  private elRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private modalService = inject(ModalService);
  private formBuilder = inject(FormBuilder);
  newPostState = inject(NewPostStateService);
  private newPostRequests = inject(NewPostRequestsService);

  subscriptions = new Subscription();

  onAddTag(tag: string): void {
    if (tag === '') {
      return;
    }

    if (!tag.startsWith('#')) {
      tag = '#' + tag;
    }

    if (this.tags.value.includes(tag)) {
      this.newPostState.errorMsgTag = `You have already entered ${tag}.`;
      return;
    }

    if (this.newPostState.errorMsgTag != '') {
      this.newPostState.errorMsgTag = '';
    }

    this.tags.push(this.formBuilder.control(tag));
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
        this.newPostState.errorMsgPhoto = 'This file has already been added.';
        return;
      }

      const validFileTypes = ['image/png', 'image/jpeg'];
      if (!validFileTypes.includes(file.type)) {
        this.newPostState.errorMsgPhoto =
          'Please, upload only PNG or JPEG images.';
        return;
      }

      const maxFileSize = maxImageSize * 1024 * 1024;
      if (file.size > maxFileSize) {
        this.newPostState.errorMsgPhoto = `The image needs to be smaller than ${maxImageSize}MB.`;
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
            this.newPostState.errorMsgPhoto =
              'NSFW content detected. Please, upload appropriate images.';
            return;
          }

          if (this.newPostState.errorMsgPhoto !== '') {
            this.newPostState.errorMsgPhoto = '';
          }

          this.imagesFiles.push(this.formBuilder.control(file));

          const previewUrl = reader.result as string;
          if (!this.newPostState.imagePreviews.includes(previewUrl)) {
            this.newPostState.imagePreviews.push(previewUrl);
          }
        };
      };

      reader.readAsDataURL(file);
    });

    (event.target as HTMLInputElement).value = '';
  }

  onRemoveFile(index: number): void {
    this.newPostState.imagePreviews = this.arrUtilService.removeElemById(
      this.newPostState.imagePreviews,
      index
    );

    this.imagesFiles.removeAt(index);
  }

  toggleStatusPicker(): void {
    this.newPostState.isStatusPickerVisible =
      !this.newPostState.isStatusPickerVisible;
  }

  onStatusPickerClose(isVisible: boolean): void {
    this.newPostState.isStatusPickerVisible = isVisible;
  }

  onStatusChange(index: number): void {
    const newStatus = statuses[index];
    this.newPostState.currentStatus = newStatus.emoji;
    this.newPostFormGroup()!.patchValue({ status: newStatus });
    this.startCreatingNewPost();
  }

  triggerFileInput(): void {
    this.newPostState.toggleNewPost(true);
    this.cdr.detectChanges();
    this.inputFile.nativeElement.click();
  }

  startCreatingNewPost(): void {
    if (!this.newPostState.isCreatingNewPost) {
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
          const isTextEmpty = this.newPostFormGroup()!.value.text;
          const isTagsEmpty = this.newPostFormGroup()!.value.tags;
          const isImagesEmpty = this.newPostFormGroup()!.value.images;
          const isStatusEmpty = this.newPostFormGroup()!.value.status;

          if (
            isTitleEmpty === null &&
            isTextEmpty === null &&
            isTagsEmpty.length === 0 &&
            isImagesEmpty.length === 0 &&
            isStatusEmpty === null
          ) {
            this.newPostState.toggleNewPost();
            this.newPostState.removeGlobalClickListener();
            return;
          } else {
            this.modalService.isModalToggled.set(true);
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

  clearFormArrays() {
    if (this.newPostFormGroup()) {
      Object.keys(this.newPostFormGroup()!.controls).forEach((key) => {
        const control = this.newPostFormGroup()!.get(key);

        if (control instanceof FormArray) {
          while (control.length !== 0) {
            control.removeAt(0);
          }
        }
      });
    }
  }

  onSubmit() {
    if (this.newPostFormGroup()?.valid) {
      const formData = this.newPostFormGroup()?.value;

      console.log(formData);

      this.subscriptions.add(
        this.newPostRequests.savePost(formData).subscribe({
          next: (response) => {
            console.log('Post saved successfully', response);
            this.clearFormArrays();
            this.newPostFormGroup()?.reset();
            this.newPostState.isCreatingNewPost = false;
            this.newPostState.resetUI();
            console.log(this.newPostFormGroup()?.value);
          },
          error: (error) => {
            console.error('Error saving post', error);
          },
        })
      );
    } else {
      console.error('Form is invalid');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
