import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { UserCardComponentComponent } from '../../shared/user-card-component/user-card-component.component';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [SearchBarComponent, UserCardComponentComponent],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  friends: string[] = [
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
    'aaa',
    'sss',
    'ddd',
  ];

  currentFriends: string[] = this.friends;

  onSearch(value: string) {
    this.currentFriends = this.friends.filter((friend) =>
      friend.includes(value)
    );
  }
}
