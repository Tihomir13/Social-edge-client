import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileRequestsService } from '../../services/profile-requests.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss',
})
export class UserInformationComponent implements OnInit, OnDestroy {
  username: string | null = '';
  subscriptions = new Subscription();

  private route = inject(ActivatedRoute);
  private requests = inject(ProfileRequestsService);

  ngOnInit(): void {
    this.username = this.route.parent?.snapshot.paramMap.get('username')!;

    if (!this.username) {
      return;
    }
    
    this.subscriptions.add(
      this.requests.getUserInfo(this.username).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
