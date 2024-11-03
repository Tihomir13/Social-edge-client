import { Component } from '@angular/core';

import { LeftSideComponent } from './components/left-side/left-side.component';
import { RightSideComponent } from './components/right-side/right-side.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LeftSideComponent, RightSideComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
