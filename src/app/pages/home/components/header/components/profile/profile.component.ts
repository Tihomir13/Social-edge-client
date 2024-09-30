import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isArrowRotated: boolean = false;

  toggleArrow() {
    this.isArrowRotated = !this.isArrowRotated;
  }
}
