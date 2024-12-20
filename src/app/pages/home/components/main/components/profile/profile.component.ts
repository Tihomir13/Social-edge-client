import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';
import { ProfileRequestsService } from './services/profile-requests.service';
import { ProfileStateService } from './services/profile-state.service';

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
  state = inject(ProfileStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profileRequestService = inject(ProfileRequestsService);

  ngOnInit(): void {
    this.userInfo = this.utilitySession.userInfo;

    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        this.username = params.get('username');
        console.log(this.username);

        if (!this.username) {
          return;
        }

        this.navigateToUserPosts();
      })
    );

    if (this.username) {
      this.subscriptions.add(
        this.profileRequestService.getInitialUserData(this.username).subscribe({
          next: (response) => {
            this.fullName = `${response.data.userData.name.firstName} ${response.data.userData.name.lastName}`;
            this.username = response.data.userData.username;
            this.state.setIsProfileOwner(response.data.isProfileOwner);

            this.isUserHasProfileImage(
              response.data.userData.profileImage.data
            );
            this.isUserHasBannerImage(response.data.userData.bannerImage.data);
          },
          error: (error) => {
            console.log(error);
          },
        })
      );
    }
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
