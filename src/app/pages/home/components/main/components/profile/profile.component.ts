import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  bannerImage =
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wsha.org%2Fwp-content%2Fuploads%2Fbanner-diverse-group-of-people-2.jpg&f=1&nofb=1&ipt=38717e8493bd9dc35c26e2911f1c37ef1bdaa1c32c3ad7ba7c196dee4a27ec0b&ipo=images';
}
