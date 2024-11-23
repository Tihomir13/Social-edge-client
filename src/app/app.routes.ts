import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { YesNoModalComponent } from './shared/components/yes-no-modal/yes-no-modal.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { MainComponent } from './pages/home/components/main/main.component';
import { ProfileComponent } from './pages/home/components/main/components/profile/profile.component';
import { FeedComponent } from './pages/home/components/main/components/feed/feed.component';
import { UserPostsComponent } from './pages/home/components/main/components/profile/components/user-posts/user-posts.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'feed', component: FeedComponent },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        children: [
          { path: 'posts', component: UserPostsComponent },
        ],
      },
    ],
  },
  {
    path: 'modal',
    component: YesNoModalComponent,
  },
];
