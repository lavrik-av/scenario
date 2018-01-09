import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, CanLoad } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AdminAreaComponent } from "./admin-area/dashboard/admin-area.component";
import { AuthGuardService } from "./shared/auth-guard.service";
import { LoginComponent } from "./login/login.component";
import { AppInfoComponent } from "./app-info/app-info.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AddUserComponent } from "./admin-area/user/add-user.component";
import { ThemeSettingsComponent } from "./admin-area/theme-settings/theme-settings.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { SelectivePreloadStrategy } from "./shared/selective-preloading-strategy";

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard',  component: DashboardComponent },
	{ path: 'scenarios', loadChildren : 'app/scenarios/scenarios.module#ScenariosModule',data : { preload : true } },
	{ path: 'admin-area', component: AdminAreaComponent, canActivate: [AuthGuardService] },
	{ path: 'add-user', component: AddUserComponent },
	{ path: 'theme-settings', component: ThemeSettingsComponent },
	{ path: 'login', loadChildren : 'app/about/about.module#AboutModule' },
	{ path: 'about', component: AppInfoComponent },
	{ path: 'user-profile', component: UserProfileComponent, canActivate : [AuthGuardService] },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot( routes, { preloadingStrategy : SelectivePreloadStrategy } )],
	exports: [RouterModule],
	providers :[ SelectivePreloadStrategy ]
})
export class AppRoutingModule { }
