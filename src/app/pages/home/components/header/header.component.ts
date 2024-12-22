import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Subscription } from 'rxjs';
import { SearchRequestsService } from './components/search-bar/services/search-requests.service';
import { HttpClientModule } from '@angular/common/http';
import { MainStateService } from '../main/shared/services/main-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isScrolled = false;
  subscriptions = new Subscription();

  router = inject(Router);
  request = inject(SearchRequestsService);
  mainState = inject(MainStateService);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;
  }

  navigateToFeed(): void {
    this.router.navigate(['home', 'feed']);
  }

  onSearch(value: any): void {
    this.router.navigate(['home', 'search'], { queryParams: { query: value } });

    this.subscriptions.add(this.request.getSearchedProfiles(value).subscribe({
      next: (response) => {
        this.mainState.setSearchedUsers(response.users);
        console.log(this.mainState.searchedUsers());
        
      },
      error: (error) => {
        console.log(error);
        this.mainState.setSearchedUsers([]);
      }
    }))
  }
  
}
