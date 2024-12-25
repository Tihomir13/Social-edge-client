import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';

import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';
import { ProfileRequestsService } from './services/profile-requests.service';
import { ProfileStateService } from './services/profile-state.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ChangeProfileModalComponent } from '../../../../../../shared/components/change-profile-modal/change-profile-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, ChangeProfileModalComponent],
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

  isModalOpened = false;

  subscriptions = new Subscription();

  defaultProfileImg = 'assets/images/default-images/profile-image.png';
  defaultBannerImg = 'assets/images/default-images/banner-image.png';

  utilitySession = inject(UtilitySessionService);
  state = inject(ProfileStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profileRequestService = inject(ProfileRequestsService);

  private renderer = inject(Renderer2);

  modalService = inject(ModalService);

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

  openModal(): void {
    this.isModalOpened = true;
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  closeModal(): void {
    this.isModalOpened = false;
    this.renderer.removeStyle(document.body, 'overflow-y');

    console.log('sss');
    
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (
      this.isModalOpened &&
      !target.closest('.modal-container') &&
      !target.closest('.profile-image')
    ) {
      this.closeModal();
    }
  }

  onChoseOption(modalOption: string): void {
    if(modalOption === 'Cancels') {
      this.closeModal();
    }
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
