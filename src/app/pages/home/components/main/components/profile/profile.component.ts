import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  fullName = '';
  userInfo: any;
  username: string | null = '';

  isSelectedPosts = false;
  isSelectedInfo = false;
  isSelectedFriends = false;
  isSelectedPhotos = false;

  bannerImage =
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wsha.org%2Fwp-content%2Fuploads%2Fbanner-diverse-group-of-people-2.jpg&f=1&nofb=1&ipt=38717e8493bd9dc35c26e2911f1c37ef1bdaa1c32c3ad7ba7c196dee4a27ec0b&ipo=images';

  utilitySession = inject(UtilitySessionService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.userInfo = this.utilitySession.userInfo;
    this.username = this.route.snapshot.paramMap.get('username');
    this.navigateToUserPosts();

    // this.fullName = `${this.userInfo.name.firstName} ${this.userInfo.name.lastName}`;
  }

  resetSelections() {
    this.isSelectedPosts = false;
    this.isSelectedInfo = false;
    this.isSelectedFriends = false;
    this.isSelectedPhotos = false;
  }

  navigateToUserPosts(): void {
    if (!this.username) {
      return;
    }
    this.router.navigate(['home', 'profile', this.username, 'posts']);
    this.resetSelections();
    this.isSelectedPosts = true;
  }

  navigateToUserInfo(): void {
    if (!this.username) {
      return;
    }
    this.router.navigate(['home', 'profile', this.username, 'information']);
    this.resetSelections();
    this.isSelectedInfo = true;
  }

  navigateToUserFriends(): void {
    if (!this.username) {
      return;
    }
    this.router.navigate(['home', 'profile', this.username, 'friends']);
    this.resetSelections();
    this.isSelectedFriends = true;
  }

  navigateToUserPhotos(): void {
    if (!this.username) {
      return;
    }
    this.router.navigate(['home', 'profile', this.username, 'photos']);
    this.resetSelections();
    this.isSelectedPhotos = true;
  }
}
