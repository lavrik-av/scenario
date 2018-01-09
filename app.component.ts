import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthService, SocialUser, GoogleLoginProvider } from "angular4-social-login";

import { environment } from "../environments/environment";
import { FirebaseService } from './shared/firebase.service';
import { HeaderService } from './shared/header.service';
import { AuthServiceApp } from "./shared/auth.service";
import { ImagesPreloaderService } from "./shared/images-preloader.service";

import { TestChildComponent } from "./test-child/test-child.component";
import { AdDirective } from "./shared/ad.directive";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

    title                       = 'Scenarios';

    showToolbarMenuButton       = false;
    showHeaderActionButtons     = false;
    showHeaderActionButtonsDone = false;
    userLoggedIn                = false;
    showTitleLeft               = false;
    useDarkTheme                = false;

    hostUrl                     = environment.hostUrl;
    imageSrcArr                 = new Array();

    @ViewChild( AdDirective ) AdHost: AdDirective;

    constructor( 
        private headerService: HeaderService, 
        private authService: AuthServiceApp, 
        private router: Router,
        private authServiceGoogle: AuthService,
        private imagesPreloaderService: ImagesPreloaderService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private firebaseService: FirebaseService
    ) {}

    ngOnInit() {

        this.headerService.onSetDarkTheme().subscribe( useDarkTheme => {

            this.useDarkTheme = useDarkTheme;

        });

        this.headerService.onShowHeaderActionButtons().subscribe( show => {

            this.showHeaderActionButtons = show;

        });

        this.headerService.onShowHeaderActionButtonsDone().subscribe( show => {

            this.showHeaderActionButtonsDone = show;            

        });

		this.authServiceGoogle.authState.subscribe( user => {
            
            if ( user != null ) {

                this.userLoggedIn = true;
                
            }
                        
        });

        this.headerService.onSetTitleLeft().subscribe( title => {

            this.title = title;
            this.showTitleLeft = true;

        });

        this.headerService.onSetTitleCenter().subscribe( title => {

            this.title = title;
            this.showTitleLeft = false;

        });
            
        this.headerService.onShowMenuButton().subscribe(

            newVal => {

                this.showToolbarMenuButton = newVal;

            }
        
        );   
        
        this.headerService.onHideMenuButton().subscribe( newVal => {

            this.showToolbarMenuButton = newVal;

        });
        
        this.headerService.onShowLoginMenuOption().subscribe( showLoginOption => {

            this.userLoggedIn = showLoginOption;

        });

        this.headerService.onHideLoginMenuOption().subscribe( hideLoginOption => {

            this.userLoggedIn = hideLoginOption;
            
        });

        let obj = this;

        let tmout = window.setTimeout( function(){

            obj.imagesPreloaderService.preloadScenariosImages().subscribe( images => {
                
                images.forEach( ( image, ind ) => {
    
                    obj.imageSrcArr.push( `${obj.hostUrl}${image}` );
    
                });
            });
                
        }, 1000, obj );

        this.firebaseService.initCloudMessages();

    }

    ngAfterViewInit():void {
            
/*         setTimeout( () => {

            this.loadTestComponent();
                            
        }, 250 );  */       
    
    }
            
    buttonDoneClicked():void {

        this.headerService.headerActionButtonDoneClicked( true );

    }

    buttonCloseClicked():void {

        this.headerService.headerActionButtonCloseClicked( true );

    }

	logout():void {

		this.authService.logout();
		this.router.navigate( ['/dashboard'] );

	}

    ngOnDestroy() {}    
 
    goBack():void {
    
        window.history.back();
    
    }

    loadTestComponent():void {
    
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory( TestChildComponent );

        let viewContainerRef = this.AdHost.viewContainerRef;

        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent( componentFactory );

        componentRef.instance.data.ad = 'Test Ad Text';
        
    }
                
}