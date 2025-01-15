import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchRequestsService } from './components/search-bar/services/search-requests.service';
import { MainStateService } from '../main/shared/services/main-state.service';
import { NotificationsWindowComponent } from './components/notifications-window/notifications-window.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, ProfileComponent, NotificationsWindowComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  defaultProfileImg = 'assets/images/default-images/profile-image.png';

  isScrolled = false;
  isNotificationsShowed = false;
  subscriptions = new Subscription();

  router = inject(Router);
  route = inject(ActivatedRoute);
  request = inject(SearchRequestsService);
  mainState = inject(MainStateService);

  ngOnInit(): void {
    // this.subscriptions.add(
    //   this.route.queryParamMap.subscribe((params) => {
    //     const queryValue = params.get('query');
    //     this.onSearch(queryValue);
    //   })
    // );
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;
  }

  navigateToFeed(): void {
    this.router.navigate(['feed']);
  }

  onSearch(value: any): void {
    this.router.navigate(['search'], { queryParams: { query: value } });

    this.subscriptions.add(
      this.request.getSearchedProfiles(value).subscribe({
        next: (response) => {
          console.log(response);

          const users = response.users.map((user: any) => {
            if (user.profileImage === null) {
              user.profileImage = { src: this.defaultProfileImg };
            }
            return user;
          });

          this.mainState.setSearchedUsers(users);
        },
        error: (error) => {
          console.log(error);
          this.mainState.setSearchedUsers([]);
        },
      })
    );
  }

  onClickOutSideNotifications(): void {
    this.isNotificationsShowed = false;
  }

  onDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleNotifications(): void {
    this.isNotificationsShowed = !this.isNotificationsShowed;
  }
}
