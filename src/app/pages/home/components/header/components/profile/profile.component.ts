import { NgClass } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  router = inject(Router);

  ngOnInit(): void {
    this.checkWindowWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  checkWindowWidth(): void {
    const width = window.innerWidth;
    this.isImageClickable = width <= 768;
  }

  toggleArrow(): void {
    this.isArrowRotated = !this.isArrowRotated;
  }

  navToProfilePage(): void {
    this.router.navigate(['home','profile']);
  }

  onImageClick(): void {
    if (this.isImageClickable) {
      this.toggleArrow();
    }
  }
}
