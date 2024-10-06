import { Component } from '@angular/core';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { status } from '../../../../../../../shared/interfaces/new-post';
import { statuses } from '../../../../../../../shared/constants/arrays';

@Component({
  selector: 'app-status-picker',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './status-picker.component.html',
  styleUrl: './status-picker.component.scss',
})
export class StatusPickerComponent {
  currentStatuses: status[] = statuses;

  SearchStatus(text: string): void {
    const lowerCaseText: string = text.toLowerCase();

    this.currentStatuses = statuses.filter((status) =>
      status.name.toLowerCase().includes(lowerCaseText)
    );
  }
}
