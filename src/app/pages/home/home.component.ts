import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { YesNoModalComponent } from '../../shared/components/yes-no-modal/yes-no-modal.component';
import { ModalService } from './components/shared/services/modal.service';
import { NewPostStateService } from './components/main/components/new-post/helpers/new-post-state.service';
import { GenerateNewPostFormService } from './components/main/components/new-post/helpers/generate-new-post-form.service';
import { FormArray, FormGroup } from '@angular/forms';
import { NgClass } from '@angular/common';
import { FriendListComponent } from "./components/main/components/friend-list/friend-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainComponent, YesNoModalComponent, NgClass, FriendListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  newPostFormGroup!: FormGroup;

  modalService = inject(ModalService);
  newPostStateService = inject(NewPostStateService);
  formService = inject(GenerateNewPostFormService);

  ngOnInit() {
    this.newPostFormGroup = this.formService.generateNewPostForm();
  }

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
