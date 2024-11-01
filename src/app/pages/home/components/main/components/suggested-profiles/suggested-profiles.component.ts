import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-suggested-profiles',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './suggested-profiles.component.html',
  styleUrl: './suggested-profiles.component.scss'
})
export class SuggestedProfilesComponent {

}
