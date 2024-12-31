import { Component, ElementRef, HostListener, output } from '@angular/core';

@Component({
  selector: 'app-notifications-window',
  imports: [],
  templateUrl: './notifications-window.component.html',
  styleUrl: './notifications-window.component.scss',
})
export class NotificationsWindowComponent {
  constructor(private elementRef: ElementRef) {}

  close = output();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    console.log(clickedInside, targetElement.closest('.notifications-container'));
    

    if (!clickedInside) {
      this.closeNotifications();
    }
  }

  closeNotifications(): void {
    console.log('Notifications component will be removed');
    this.close.emit();
  }

  // OnDestroy за почистване на ресурси, ако е необходимо
  ngOnDestroy(): void {
    console.log('Notifications component destroyed');
  }
}
