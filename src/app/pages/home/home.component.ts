import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { YesNoModalComponent } from '../../shared/components/yes-no-modal/yes-no-modal.component';
import { ModalService } from './components/shared/services/modal.service';
import { NewPostStateService } from './components/main/components/feed/components/new-post/services/new-post-state.service';

import { JwtInterceptor } from '../../shared/interceptors/jwt.interceptor';
import { GenerateNewPostForm } from './components/main/components/feed/components/new-post/helpers/form-factory/new-post-form';
import { NewPostFormServiceService } from './components/shared/services/new-post-form-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainComponent, YesNoModalComponent, NgClass],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor() {}

  modalService = inject(ModalService);
  newPostStateService = inject(NewPostStateService);
  newPostFormService = inject(NewPostFormServiceService);

  ngOnInit(): void {
    const newPostFormGroup: FormGroup =
      new GenerateNewPostForm().generateNewPostForm();

    this.newPostFormService.setFormGroup(newPostFormGroup);
  }

  onChoseOption(option: boolean) {
    if (option === true) {
      const tagsArray = this.newPostFormService.newPostFormGroup().get('tags') as FormArray;
      tagsArray.clear();

      const imagesArray = this.newPostFormService.newPostFormGroup()?.get('images') as FormArray;
      imagesArray.clear();
      this.newPostStateService.imagePreviews = [];
      this.newPostStateService.currentStatus = '';

      this.newPostFormService.newPostFormGroup().reset();
      this.newPostStateService.toggleNewPost(false);
      this.newPostStateService.removeGlobalClickListener();
    }

    this.modalService.toggleModal();
  }
}
