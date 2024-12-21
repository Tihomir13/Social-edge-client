import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  profileImg = input<string>('assets/images/image.png');
  fullName = input<string>('Tihomir Susamov');
  username = input<string>('pichaga123');

  ngOnInit() {
  }
}
