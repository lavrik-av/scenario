import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatSnackBar } from "@angular/material";

import { HeaderService } from "../../shared/header.service";
import { ScenariosService } from "../../shared/scenarios.service";
import { Frame } from "../../core/models/frame";

const DIGITS_REGEX = /[-+]?[0-9]*[.,]?[0-9]+/;

@Component({
	selector: 'app-edit-frame',
	templateUrl: './edit-frame.component.html',
	styleUrls: ['./edit-frame.component.css']
})
export class EditFrameComponent implements OnInit {

	pageTitle	= 'Edit frame';

	frame:		Frame;
	frameForm:	FormGroup;

	scenarioKey	= '';
	sceneKey	= '';
	frameKey	= '';

	constructor( 
		private headerService: HeaderService,
		private formBuilder: FormBuilder,
		private scenariosService: ScenariosService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private matSnackBar: MatSnackBar
	 ) { }
	
	ngOnInit() {

		this.headerService.showHeaderActionButtons( true );
		this.headerService.showHeaderActionButtonsDone( true );

		this.headerService.onHeaderActionButtonDoneClicked().subscribe( show => {

			this.submit();

		});

		this.activatedRoute.params.subscribe( params => {

			this.frame = <Frame>this.scenariosService.getFrame( params['scenarioKey'], params['sceneKey'], params['frameKey'] );
			this.headerService.setTitleLeft( this.pageTitle );

			this.scenarioKey	= params['scenarioKey'];
			this.sceneKey		= params['sceneKey'];
			this.frameKey		= params['frameKey'];
					
			this.createForm();
			
		});

		this.frameForm.statusChanges.subscribe( changes => {

			let showDoneButton = (changes == 'VALID' ) ? true : false ;
			this.headerService.showHeaderActionButtonsDone( showDoneButton );

		});

		this.headerService.onHeaderActionButtonCloseClicked().subscribe( show => {

			this.router.navigate( [ '/scenarios', 'scenario', this.scenarioKey, 'scene', this.sceneKey, 'frame', this.frameKey ] );

		});
				
	}

	createForm():void {

		this.frameForm = this.formBuilder.group({

			title : [ this.frame.title, [ Validators.required, Validators.minLength(3), Validators.maxLength(32) ] ],
			descr : [ this.frame.descr, Validators.required ],
			cameraAH: [ this.frame.specs.camera.ah, [ Validators.required, Validators.pattern( DIGITS_REGEX ) ] ],
			cameraAV: [ this.frame.specs.camera.av, [ Validators.required, Validators.pattern( DIGITS_REGEX ) ] ],
			cameraAZ: [ this.frame.specs.camera.az, [ Validators.required, Validators.pattern( DIGITS_REGEX ) ] ],
			cameraDistance: [ this.frame.specs.camera.distance, [ Validators.required, Validators.pattern( DIGITS_REGEX ) ] ],
			cameraHeight: [ this.frame.specs.camera.height, [ Validators.required, Validators.pattern( DIGITS_REGEX ) ] ]
		});

	}

	checkRequiredError( controlName: string ): boolean {

		if ( this.frameForm.get( controlName ).errors != null ) {
			
			return ( this.frameForm.get( controlName ).errors.required != null ) ? true : false;			

		} else {
			
			return false;

		}		

	}
	
	checkMinlengthError( controlName: string ): boolean {

		if ( this.frameForm.get( controlName ).errors != null ) {

			return ( this.frameForm.get( controlName ).errors.minlength != null ) ? true : false ;			

		} else {
			
			return false;

		}		

	}
	
	checkMaxlengthError( controlName: string ): boolean {

		if ( this.frameForm.get( controlName ).errors != null ) {

			return ( this.frameForm.get( controlName ).errors.maxlength != null ) ? true : false ;			

		} else {
			
			return false;

		}		

	}

	checkDigitsError( controlName: string ): boolean {

		if ( this.frameForm.get( controlName ).errors != null ) {

			return ( this.frameForm.get( controlName ).errors.pattern != null ) ? true : false ;			

		} else {
			
			return false;

		}		

	}

	submit():void {
		
		this.frame.title = this.frameForm.value.title;
		this.frame.descr = this.frameForm.value.descr;

		this.frame.specs.camera.ah = this.frameForm.value.cameraAH;
		this.frame.specs.camera.av = this.frameForm.value.cameraAV;
		this.frame.specs.camera.az = this.frameForm.value.cameraAZ;

		this.frame.specs.camera.distance = this.frameForm.value.cameraDistance;
		this.frame.specs.camera.height 	 = this.frameForm.value.cameraHeight;

		let promise = this.scenariosService.updateFrame( this.frame, this.scenarioKey, this.sceneKey );

		promise.then( result => {
			
			this.matSnackBar.open( 'Updated', 'Close', { duration : 1000 } );

			window.setTimeout( this.goBackEditFrame(), 1000 );

		}).catch( error => {

			console.log( 'Updating error: ', error );

		});
					
	}

	goBackEditFrame(){

		this.router.navigate( [ '/scenarios','scenario', this.scenarioKey, 'scene', this.sceneKey, 'frame', this.frameKey ] );

	}
	
	goBack():void {
		
		this.router.navigate( [ '/scenarios', 'scenario', this.scenarioKey, 'scene', this.sceneKey, 'frame', this.frameKey ] );
				
	}			
	
}
