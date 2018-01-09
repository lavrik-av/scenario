import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthServiceApp } from "../../shared/auth.service";
import { HeaderService } from "../../shared/header.service";

@Component({
	selector: 'app-admin-area',
	templateUrl: './admin-area.component.html',
	styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit {

	title = 'Admin Dashboard';
	user: any;
	socialUser: any;
	
	constructor( private authServiceApp: AuthServiceApp, private router: Router, private headerService: HeaderService ) { }
	
	ngOnInit() {
	
		this.headerService.showMenuButton();
		this.headerService.setTitleLeft( this.title );
		
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
