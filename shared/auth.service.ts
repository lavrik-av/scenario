import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { environment } from "../../environments/environment";
import { AuthService, SocialUser, GoogleLoginProvider } from "angular4-social-login";

@Injectable()
export class AuthServiceApp {

	socialUser: SocialUser;
	user: any;
	isLoggedIn	= false;
	redirectUrl	= '/dashboard';
	endPoint	= environment.userEndPoint;

	//http://www.dev.online-playlist.com/Api/Users/loginUser?userData={%22id%22:null,%22name%22:null,%22username%22:%22test15@test.com%22,%22password%22:%22testuser%22,%22email%22:null,%22image%22:null,%22session%22:null}

	//constructor( private HttpClient: HttpClient ) {}
	constructor( private HttpClient: HttpClient, private authServiceGoogle: AuthService ) {

		this.authServiceGoogle.authState.subscribe( user => {

			if ( user != null ) {

				this.isLoggedIn = true;
				this.socialUser = user;
				
			}
			
		});

	}
	
	login( login: string, password: string ): Observable<any> {

		/* "data": {
			"id": "",
			"name": "",
			"username": "test15@test.com",
			"email": "",
			"session": "",
			"password": "testuser",
			"image": ""
		  }	 */	

		/* let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let endPoint: string = AppConst.siteUrl + AppConst.loginUserUrl;
        let userData: string = JSON.stringify( user ); */

		//this.http.post( endPoint  + '?userData=' + userData, userData, options  )
	
		return this.HttpClient.get('http://www.dev.online-playlist.com/Api/Users/loginUser?userData={%22id%22:null,%22name%22:null,%22username%22:%22test15@test.com%22,%22password%22:%22testuser%22,%22email%22:null,%22image%22:null,%22session%22:null}').retry(3);
		
	}
	
	logout(){
		
		this.isLoggedIn = false;
		this.user 		= null;

	}

	loginUserGoogle( PROVIDER_ID ):void {

		this.authServiceGoogle.signIn( GoogleLoginProvider.PROVIDER_ID );
		
	}

	logoutGoogleUser():void {

		this.authServiceGoogle.signOut();

	}
	
}
