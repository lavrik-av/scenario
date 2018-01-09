import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { AuthServiceApp } from "../shared/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

	constructor( private authService: AuthServiceApp, private router: Router ) { }

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
		
		return this.checkUserLoggedIn( state.url );

	}

	canLoad( route: Route ):boolean {

		return this.checkUserLoggedIn( `/{$route.path}` );

	}

	checkUserLoggedIn( redirectUrl: string ): boolean {

		if ( this.authService.isLoggedIn ) {
			
			return true;

		} 
		else {
			
			this.router.navigate(['/login']);

			this.authService.redirectUrl = redirectUrl;
			
			return false;

		}

	}
	
}
