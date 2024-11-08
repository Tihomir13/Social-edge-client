import { Component, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { YesNoModalComponent } from '../../shared/components/yes-no-modal/yes-no-modal.component';
import { ModalService } from './components/shared/services/modal.service';
import { NewPostStateService } from './components/main/components/new-post/services/new-post-state.service';

import { FriendListComponent } from './components/main/components/friend-list/friend-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../shared/interceptors/jwt.interceptor';
import { GenerateNewPostForm } from './components/main/components/new-post/helpers/form-factory/new-post-form';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    YesNoModalComponent,
    NgClass,
    FriendListComponent,
  ],
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
export class HomeComponent {
  public newPostFormGroup: FormGroup =
    new GenerateNewPostForm().generateNewPostForm();

  modalService = inject(ModalService);
  newPostStateService = inject(NewPostStateService);

  onChoseOption(option: boolean) {
    if (option === true) {
      const tagsArray = this.newPostFormGroup.get('tags') as FormArray;
      tagsArray.clear();

      const imagesArray = this.newPostFormGroup?.get('images') as FormArray;
      imagesArray.clear();
      this.newPostStateService.imagePreviews = [];
      this.newPostStateService.currentStatus = '';

      this.newPostFormGroup.reset();
      this.newPostStateService.toggleNewPost(false);
      this.newPostStateService.removeGlobalClickListener();
    }

    this.modalService.toggleModal();
  }
}
