import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  isArrowRotated = false;
  isImageClickable = false;

  ngOnInit(): void {
    this.checkWindowWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    const width = window.innerWidth;
    this.isImageClickable = width <= 768;
  }

  toggleArrow() {
    this.isArrowRotated = !this.isArrowRotated;
  }

  onImageClick() {
    if (this.isImageClickable) {
      this.toggleArrow();
    }
  }
}
