import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isScrolled = false;

  router = inject(Router);

  navigateToFeed(): void {
    this.router.navigate(['home','feed']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50;
  }
}
