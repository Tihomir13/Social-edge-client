import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProfileRequestsService } from '../../services/profile-requests.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProfileStateService } from '../../services/profile-state.service';
import { InfoCardComponent } from "./info-card/info-card.component";
import { InfoCardArrComponent } from "./info-card-arr/info-card-arr.component";

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [InfoCardComponent, InfoCardArrComponent],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss',
})
export class UserInformationComponent implements OnInit, OnDestroy {
  username: string | null = '';
  subscriptions = new Subscription();
  userInfo: any = {};

  private route = inject(ActivatedRoute);
  private requests = inject(ProfileRequestsService);
  state = inject(ProfileStateService)

  ngOnInit(): void {
    this.username = this.route.parent?.snapshot.paramMap.get('username')!;

    if (!this.username) {
      return;
    }

    this.subscriptions.add(
      this.requests.getUserInfo(this.username).subscribe({
        next: (response) => {
          console.log(response);
          this.userInfo = response.userInfo;
          console.log(this.userInfo.studied);
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
