import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { FirebaseService } from '../../shared/firebase.service';
import { HeaderService } from '../../shared/header.service';
import { ScenariosService } from '../../shared/scenarios.service';

@Component({
    selector: 'app-scenarios',
    templateUrl: './scenarios.component.html',
    styleUrls: ['./scenarios.component.css']
})

export class ScenariosComponent implements OnInit {

    title = 'Scenarios';

    hostUrl = environment.hostUrl;
    
    subscription: Subscription;
    
    public scenarios: Observable<any>;

    constructor( 
        private firebaseService: FirebaseService, 
        private headerService: HeaderService, 
        public dialog: MatDialog,
        private router: Router,
        private scenariosService: ScenariosService
    ) {}

    ngOnInit() {
        
        this.headerService.setTitleLeft( this.title );

        this.headerService.showHeaderActionButtons( false );
		this.headerService.showHeaderActionButtonsDone( false );

        this.headerService.hideMenuButton();

        let scenarios = this.scenariosService.getScenarios();
        
        if (  typeof scenarios == 'undefined' ) {

            this.getScenarios();
            
        }
        else {

            this.scenarios = this.scenariosService.getScenarios();
            
        }

    }
        
    getScenarios(): void {

        this.subscription =  this.firebaseService.getScenarios().subscribe( scenarios => {

            this.scenarios = scenarios;
            this.scenariosService.setScenarios( this.scenarios );

            this.subscription.unsubscribe();

        });

    }

    generateArray(obj): object[]{
    
        return Object.keys(obj).map((key)=>{ return obj[key]});
    
    } 
    
    showScenario( key ):void {

        this.router.navigate( ['/scenarios', 'scenario', key] );

    }
    
    showInfo( scenario: any ):void {

        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { title: scenario.title, description: scenario.description }
          });
      
          dialogRef.afterClosed().subscribe(result => {
          });
      
    }
    
    ngOnDestroy() {

    }            
    
}

@Component({
    selector: 'dialog-overview-example-dialog',
    template: `
    <h1 mat-dialog-title id="mat-dialog-title-0">{{data.title}}</h1>
    <mat-dialog-content class="accent-color">
    <p>{{data.description | noquotes}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close color="primary" tabindex="-1">CLOSE</button>
    </mat-dialog-actions>
  `,
  })
export class DialogOverviewExampleDialog {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    
}