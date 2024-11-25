import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';
import { ProfileRequestsService } from './services/profile-requests.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [ProfileRequestsService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  fullName = '';
  userInfo: any;
  username: string | null = '';

  profileImage = '';
  bannerImage = '';

  isSelectedPosts = false;
  isSelectedInfo = false;
  isSelectedFriends = false;
  isSelectedPhotos = false;

  subscriptions = new Subscription();

  defaultProfileImg = 'assets/images/default-images/profile-image.png';
  defaultBannerImg = 'assets/images/default-images/banner-image.png';

  utilitySession = inject(UtilitySessionService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  profileRequestService = inject(ProfileRequestsService);

  ngOnInit(): void {
    this.userInfo = this.utilitySession.userInfo;
    this.username = this.route.snapshot.paramMap.get('username');

    if (!this.username) {
      return;
    }
    this.subscriptions.add(
      this.profileRequestService.getInitialUserData(this.username).subscribe({
        next: (response) => {
          console.log(response);
          this.isUserHasProfileImage(response.userData.profileImage.data);
          this.isUserHasBannerImage(response.userData.bannerImage.data);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );

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

  isUserHasBannerImage(bannerImage: string): void {
    if (bannerImage === '') {
      this.bannerImage = this.defaultBannerImg;
    } else {
      this.bannerImage = bannerImage;
    }
  }

  isUserHasProfileImage(profileImage: string): void {
    if (profileImage === '') {
      this.profileImage = this.defaultProfileImg;
    } else {
      this.profileImage = profileImage;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
