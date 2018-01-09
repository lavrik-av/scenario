import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* to be removed */
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* to be removed */
import { 
    MatSidenavModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSelectModule, 
    MatTabsModule, 
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";    

//remove it ??
import { MatDialogModule } from '@angular/material';

import { environment } from '../environments/environment';

import { FirebaseService } from './shared/firebase.service';
import { HeaderService } from './shared/header.service';
import { ScenariosService } from './shared/scenarios.service';
import { ImagesPreloaderService } from "./shared/images-preloader.service";
import { AuthGuardService } from "./shared/auth-guard.service";
import { AuthServiceApp } from "./shared/auth.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAreaComponent } from './admin-area/dashboard/admin-area.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { AddUserComponent } from './admin-area/user/add-user.component';
import { ThemeSettingsComponent } from './admin-area/theme-settings/theme-settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestChildComponent } from './test-child/test-child.component';
import { AdDirective } from "./shared/ad.directive";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider( environment.googleAPIkey )
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
      AppComponent,
      DashboardComponent,
      AdminAreaComponent,
      LoginComponent,
      UserProfileComponent,
      AppInfoComponent,
      AddUserComponent,
      ThemeSettingsComponent,
      PageNotFoundComponent,
      TestChildComponent,
      AdDirective
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabaseModule,
      HttpModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatSidenavModule, 
      MatButtonModule, 
      MatButtonToggleModule, 
      MatCardModule, 
      MatMenuModule, 
      MatToolbarModule, 
      MatIconModule, 
      MatSelectModule,
      MatTabsModule,
      MatGridListModule,
      MatExpansionModule,
      MatDialogModule,
      MatListModule,
      MatInputModule,
      MatSnackBarModule,
      MatSlideToggleModule,
      FormsModule,
      ReactiveFormsModule,
      SocialLoginModule
  ],
  entryComponents: [
    TestChildComponent
  ],
  providers: [
      FirebaseService,
      HeaderService,
      ScenariosService,
      ImagesPreloaderService,
      AuthGuardService,
      AuthServiceApp,
      {
        provide: AuthServiceConfig,
        useFactory: provideConfig
      },
      AngularFireAuth   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
