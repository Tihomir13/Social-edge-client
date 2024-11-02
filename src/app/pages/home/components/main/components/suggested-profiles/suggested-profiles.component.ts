import { Component } from '@angular/core';

import { UserCardComponentComponent } from '../../shared/user-card-component/user-card-component.component';

@Component({
  selector: 'app-suggested-profiles',
  standalone: true,
  imports: [UserCardComponentComponent],
  templateUrl: './suggested-profiles.component.html',
  styleUrl: './suggested-profiles.component.scss',
})
export class SuggestedProfilesComponent {
  suggestedProfiles: string[] = ['aaa', 'sss', 'ddd', 'aaa', 'sss'];
}
