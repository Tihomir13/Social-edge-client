import { Component, HostListener, input, output, signal } from '@angular/core';
import { status } from '../../../../../../../shared/interfaces/new-post';
import { statuses } from '../../../../../../../shared/constants/arrays';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-status-picker',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './status-picker.component.html',
  styleUrls: ['./status-picker.component.scss'],
})
export class StatusPickerComponent {
  currentStatuses = statuses;

  isVisible = input<boolean>(false);
  close = output<boolean>();

  localVisibility = signal<boolean>(this.isVisible());

  SearchStatus(text: string): void {
    const lowerCaseText: string = text.toLowerCase();
    this.currentStatuses = statuses.filter((status) =>
      status.name.toLowerCase().includes(lowerCaseText)
    );
  }

  private closePicker(): void {
    this.localVisibility.set(false);
    this.close.emit(this.localVisibility());
  }

  ngOnChanges(): void {
    this.localVisibility.set(this.isVisible());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.localVisibility() && !target.closest('.status-picker-container')) {
      this.closePicker();
    }
  }
}
