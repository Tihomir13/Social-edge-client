import { Component, inject, input, output } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { UserCardComponentComponent } from '../../shared/user-card-component/user-card-component.component';
import { MainStateService } from '../../shared/main-state.service';

@Component({
  selector: 'app-friend-list',
  standalone: true,
  imports: [SearchBarComponent, UserCardComponentComponent],
  templateUrl: './friend-list.component.html',
  styleUrl: './friend-list.component.scss',
})
export class FriendListComponent {
  friends = input<string[]>();
  open = output<any>();

  state = inject(MainStateService);

  currentFriends?: string[] = this.state.friends;

  onSearch(value: string): void {
    this.currentFriends = this.friends()?.filter((friend) =>
      friend.includes(value)
    );
  }

  onUserProfileClick(friend: any): void {
    this.open.emit(friend);
  }
}
