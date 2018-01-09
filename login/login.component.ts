import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { AuthService, SocialUser, GoogleLoginProvider } from "angular4-social-login";

import { environment } from "../../environments/environment";
import { AuthServiceApp } from "../shared/auth.service";
import { HeaderService } from "../shared/header.service";
import { UserForm } from "../core/models/user";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	hostUrl				= environment.hostUrl;

	showLoginButton		= false;
	showPasswordError	= false;
	showLoginError		= false;

	userFields			= new UserForm;
	socialUser: SocialUser;

	constructor( 
		private authServiceApp: AuthServiceApp,
		private authServiceGoogle: AuthService,
		private router: Router,
		private headerService: HeaderService
	) {}
	
	ngOnInit() {

		this.headerService.setTitleLeft( 'Login' );

		this.headerService.hideMenuButton();

		this.authServiceGoogle.authState.subscribe( user => {

			this.socialUser = user;

			if ( this.socialUser ) {

					this.authServiceApp.isLoggedIn	= true;

					this.authServiceApp.socialUser	= this.socialUser;

					this.headerService.hideLoginMenuOption();

					this.router.navigate( [this.authServiceApp.redirectUrl] );	
									
				
			} else {

				console.log( 'Google Auth - not auhtorized' );
				
			}

		});

	}
	
	loginUserGoogle():void  {

		this.authServiceApp.loginUserGoogle( GoogleLoginProvider.PROVIDER_ID );
		
	}

	loginUser( login: string, password: string  ):void  {

		if ( login.length && password.length ) {

			this.authServiceApp.login( login, password ).subscribe( response => {
				
				if ( response.result ) {
					
					this.authServiceApp.isLoggedIn = true;

					this.authServiceApp.user = response.data;
					
					this.headerService.hideLoginMenuOption();

					this.router.navigate( [ this.authServiceApp.redirectUrl ] );					
		
				}
				else {

					this.authServiceApp.isLoggedIn = false;
					console.log( `Wrong credentials` );
					
				}
				
			},
			error => {

				console.log( error );

			});
			
							
		}


	}

	logout():void {

		this.authServiceApp.logout();
		this.headerService.showLoginMenuOption();
		this.router.navigate( ['/dashboard'] );

	}

	checkFields( login: string, password: string ):void {

		this.showLoginButton   = ( login.length && password.length ) ? true : false ;

		this.showLoginError    = ( !login.length ) ? true : false ;
		this.showPasswordError = ( !password.length ) ? true : false ;

	}

	loginEnter( login: string, password: string ) :void {

		if ( login.length && password.length ) {
			
			this.loginUser( login, password );

		}

	}

	submitForm( login: string, password: string ):void {

		this.loginUser( login, password );

	}

	showEmptyFieldErrors( login: string, password: string ):void {

		this.showLoginError    = ( !login.length ) ? true : false ;
		this.showPasswordError = ( !password.length ) ? true : false ;

	}
	
	goBack():void {
	
		window.history.back();
	
	}
	
}
