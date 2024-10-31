import { Component, input, OnInit } from '@angular/core';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { YesNoModalComponent } from '../../../../shared/components/yes-no-modal/yes-no-modal.component';
import { FormGroup } from '@angular/forms';
import { FriendListComponent } from "./components/friend-list/friend-list.component";
import { SuggestedProfilesComponent } from "./components/suggested-profiles/suggested-profiles.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NewPostComponent, PostComponent, YesNoModalComponent, FriendListComponent, SuggestedProfilesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  posts: any = [];
  newPostFormGroup = input<FormGroup>();

  ngOnInit(): void {
    //posts
  }
}
