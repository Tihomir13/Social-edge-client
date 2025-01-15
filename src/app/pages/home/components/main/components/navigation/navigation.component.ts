import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitySessionService } from '../../../../../../shared/services/utility/utility.service';

@Component({
  selector: 'app-navigation',
  imports: [NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navItems = [
    { label: 'Home', icon: 'assets/icons/navigation/homepage.svg' },
    { label: 'People', icon: 'assets/icons/navigation/people.svg' },
    { label: 'Profile', icon: 'assets/icons/navigation/profile.svg' },
  ];
  selectedOption = this.navItems[0];

  router = inject(Router);
  utilitySession = inject(UtilitySessionService);

  selectOption(option: any): void {
    this.selectedOption = option;

    switch (option.label) {
      case 'Home':
        this.router.navigate(['feed']);
        break;
      case 'People':
        this.router.navigate([]);
        break;
      case 'Profile':
        const username = this.utilitySession.userInfo.username;
        this.router.navigate(['profile', username, 'posts']);
        break;
    }
  }
}
