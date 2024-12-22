import { Component, inject, OnInit } from '@angular/core';

import { UserCardComponent } from './components/user-card/user-card.component';
import { MainStateService } from '../../../shared/services/main-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  mainState = inject(MainStateService);

  router = inject(Router);

  onClickProfile(username: string):void {
      this.router.navigate(['home', 'profile', username]);
      console.log('aaa');
      
  }
}
