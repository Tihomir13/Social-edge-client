import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';

import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';
import { ProfileRequestsService } from './services/profile-requests.service';
import { ProfileStateService } from './services/profile-state.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { ChangeProfileModalComponent } from '../../../../../../shared/components/change-profile-modal/change-profile-modal.component';
import * as nsfwjs from 'nsfwjs';
import { maxImageSize } from '../../../../../../shared/constants/settings';

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

  @ViewChild('fileInput') fileInput!: ElementRef;

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

        this.getInitialData(this.username);

        this.navigateToUserPosts();
      })
    );

    if (this.username) {
    }
  }

  getInitialData(username: string | null): void {
    if (!username) {
      return;
    }

    this.subscriptions.add(
      this.profileRequestService.getInitialUserData(username).subscribe({
        next: (response) => {
          this.fullName = `${response.data.userData.name.firstName} ${response.data.userData.name.lastName}`;
          this.username = response.data.userData.username;
          this.state.setIsProfileOwner(response.data.isProfileOwner);

          this.isUserHasProfileImage(response.data.userData.profileImage);
          this.isUserHasBannerImage(response.data.userData.bannerImage);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
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

  isUserHasBannerImage(bannerImage: {
    contentType: string;
    src: string;
  }): void {
    if (bannerImage === null) {
      this.bannerImage = this.defaultBannerImg;
    } else {
      this.bannerImage = bannerImage.src;
    }
  }

  isUserHasProfileImage(profileImage: {
    contentType: string;
    src: string;
  }): void {
    if (profileImage === null) {
      this.profileImage = this.defaultProfileImg;
    } else {
      this.profileImage = profileImage.src;
    }
  }

  openModal(): void {
    this.isModalOpened = true;
    this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  }

  closeModal(): void {
    this.isModalOpened = false;
    this.renderer.removeStyle(document.body, 'overflow-y');
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

  triggerFileInput(): void {
    this.renderer.selectRootElement(this.fileInput.nativeElement).click();
  }

  onChoseOption(modalOption: string): void {
    if (modalOption === 'Upload Photo') {
      this.triggerFileInput();
    }

    if (modalOption === 'Remove Photo') {
      this.removePhoto();
    }

    if (modalOption === 'Cancel') {
      this.closeModal();
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('images', file);

    this.subscriptions.add(
      this.profileRequestService
        .addNewPhoto(this.username, formData)
        .subscribe({
          next: () => {
            this.getInitialData(this.username);
          },
          error: (error) => {
            console.log(error);
          },
        })
    );
    this.closeModal();
  }

  async onAddFile(event: any): Promise<void> {
    const files = event.target.files as File[];
    if (files.length === 1) {
      this.uploadFile(files[0]);
    }
  }

  removePhoto(): void {
    this.subscriptions.add(
      this.profileRequestService.removePhoto(this.username).subscribe({
        next: () => {
          this.getInitialData(this.username);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );

    this.closeModal();
  }

  isValidFileType(file: File): boolean {
    const validFileTypes = ['image/png', 'image/jpeg'];
    return validFileTypes.includes(file.type);
  }

  isValidFileSize(file: File): boolean {
    const maxFileSize = maxImageSize * 1024 * 1024;
    return file.size <= maxFileSize;
  }

  async checkNsfw(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = async () => {
          const model = await nsfwjs.load('InceptionV3');
          const predictions = await model.classify(image);
          const nsfwResult = predictions.find(
            (p) => p.className === 'Porn' || p.className === 'Hentai'
          );
          resolve(!(nsfwResult && nsfwResult.probability > 0.3));
        };
      };
      reader.readAsDataURL(file);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
