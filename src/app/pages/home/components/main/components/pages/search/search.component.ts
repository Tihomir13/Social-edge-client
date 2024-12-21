import { Component } from '@angular/core';

import { UserCardComponent } from './components/user-card/user-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  items = 2;
}
