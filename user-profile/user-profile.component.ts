import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceApp } from "../shared/auth.service";
import { HeaderService } from "../shared/header.service";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	title = 'User Profile';
	user: any;
	socialUser: any;
	
	constructor( private authServiceApp: AuthServiceApp, private router: Router, private headerService: HeaderService ) { }
	
	ngOnInit() {

		this.headerService.setTitleLeft( this.title );		
		this.headerService.showMenuButton();

		this.user 		= this.authServiceApp.user;
		this.socialUser = this.authServiceApp.socialUser;
	
	}

	logutUser():void {

		this.authServiceApp.logout();
		this.router.navigate( ['/dashboard'] );

	}

	logutGoogleUser(): void {

		this.authServiceApp.logoutGoogleUser();

		this.authServiceApp.socialUser = null;
		this.authServiceApp.isLoggedIn = false;

		this.router.navigate( ['/dashboard'] );

	}	
	
}
