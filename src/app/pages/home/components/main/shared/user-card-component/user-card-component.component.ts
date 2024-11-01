import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card-component',
  standalone: true,
  imports: [],
  templateUrl: './user-card-component.component.html',
  styleUrl: './user-card-component.component.scss',
})
export class UserCardComponentComponent {
  username = input<string>('username');
}
