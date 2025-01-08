import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DailyActivityComponent } from './daily-activity/daily-activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DailyActivityService } from './services/daily-activity.service';
import { RecommendationPageComponent } from './recommendation-page/recommendation-page.component';
import { SocialPageComponent } from './social-page/social-page.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { AchivementComponent } from './achivement/achivement.component';

const routes: Routes = [
  { path: '', component: SocialPageComponent },
  { path: 'friends-list', component: FriendListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    DailyActivityComponent,
    DashboardComponent,
    LoginComponent,
    RecommendationPageComponent,
    SocialPageComponent,
    FriendListComponent,
    AchivementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DailyActivityService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
