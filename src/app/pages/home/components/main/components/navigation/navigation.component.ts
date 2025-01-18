import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  imports: [NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navItems = [
    { label: 'Feed', icon: 'assets/icons/navigation/homepage.svg' },
    { label: 'People', icon: 'assets/icons/navigation/people.svg' },
    { label: 'Profile', icon: 'assets/icons/navigation/profile.svg' },
  ];
  selectedOption: undefined | { label: string; icon: string } = undefined;
  subscriptions = new Subscription();
  mainRoute: string = '';
  segments: string[] = [];

  router = inject(Router);
  route = inject(ActivatedRoute);
  utilitySession = inject(UtilitySessionService);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const fullUrl = event.urlAfterRedirects;
        this.segments = fullUrl.split('/');
        this.mainRoute = this.segments[1];
        this.markOption(this.mainRoute);
      });
  }

  selectOption(option: string): void {
    const loweCaseOption = option.toLocaleLowerCase();

    switch (loweCaseOption) {
      case 'feed':
        this.router.navigate(['feed']);
        this.selectedOption = this.navItems[0];
        break;
      case 'people':
        this.router.navigate([]);
        this.selectedOption = this.navItems[1];
        break;
      case 'profile':
        const username = this.utilitySession.userInfo.username;
        this.router.navigate(['profile', username, 'posts']);
        this.selectedOption = this.navItems[2];
        break;
    }
  }

  markOption(option: string): void {
    const loweCaseOption = option.toLocaleLowerCase();

    switch (loweCaseOption) {
      case 'feed':
        this.selectedOption = this.navItems[0];
        break;
      case 'people':
        this.selectedOption = this.navItems[1];
        break;
      case 'profile':
        const username = this.utilitySession.userInfo.username;
        
        if (this.segments[2] !== username) {
          this.selectedOption = undefined;
          break;
        }

        this.selectedOption = this.navItems[2];
        break;
    }
  }

  onDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
