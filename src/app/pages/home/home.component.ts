import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { YesNoModalComponent } from '../../shared/components/yes-no-modal/yes-no-modal.component';
import { ModalService } from './components/shared/services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MainComponent, YesNoModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  modalService = inject(ModalService);
}
