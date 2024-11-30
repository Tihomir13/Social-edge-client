import { Component, inject, input } from '@angular/core';

import { ProfileStateService } from '../../../services/profile-state.service';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  userInfo = input<string | null | []>();
  alt = input<string>();
  imgSrc = input<string>();

  state = inject(ProfileStateService);
}
