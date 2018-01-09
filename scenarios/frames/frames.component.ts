import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";

import {
	trigger,
	state,
	style,
	animate,
	transition,
	AnimationEvent
  } from '@angular/animations';

import { ScenariosService } from "../../shared/scenarios.service";
import { environment } from "../../../environments/environment";
import { HeaderService } from "../../shared/header.service";

import * as FrameModel from "../../core/models/frame";

@Component({
	selector: 'app-frames',
	templateUrl: './frames.component.html',
	styleUrls: ['./frames.component.css'],
	animations : [
		trigger( 'myTrigger', [
			state( 'out', style( { transform : 'translateX(150%)' } ) ),
			transition( '* => out', animate( '300ms ease-out' ) )
		])
	]
})
export class FramesComponent implements OnInit {
	
	title = '';

	state = '';
	states = {};

	scenarioKey 	= 	0;
	sceneKey 		=	0;

	scene: 			object;
	frames: 		object[] = new Array;
	framesTmp: 		object[];
	newFrame: 		FrameModel.Frame;

	arrayKeyToRemove = 0;
	frameKeyToRemove = '';

	hostUrl 		= environment.hostUrl;

	constructor( 
		private activatedRoute: ActivatedRoute, 
		private scenariosService: ScenariosService,
		private router: Router ,
		private headerService: HeaderService,
		private snackBar: MatSnackBar
	) {}

	ngOnInit() {

		this.headerService.showHeaderActionButtons( false );
		this.headerService.showHeaderActionButtonsDone( false );

		this.activatedRoute.params.subscribe( params => {
			
			this.scenarioKey	= params['scenarioKey'];
			this.sceneKey		= params['sceneKey'];
			
			this.scene			= this.scenariosService.getScene( params['scenarioKey'], params['sceneKey'] );
			this.frames			= this.generateArray(this.scenariosService.getFrames( params['scenarioKey'], params['sceneKey'] ));

			this.frames.forEach( ( el, ind ) => {

				this.states[ el['key'] + '' ] = '';

			});

			this.title = this.scene['title'];
			this.headerService.setTitleLeft( this.title );
			
		});
	
	}

	addFrame( scenarioKey: number, sceneKey: number ): void {

		this.router.navigate( [ '/scenarios', 'scenario', scenarioKey, 'scene', sceneKey, 'frames', 'add' ] );

	}

    generateArray( obj ): object[]{

		return ( obj ) ? Object.keys(obj).map((key)=>{ return obj[key]}) : [];
		
	}

	viewFrame( frameKey: string ):void {

		this.router.navigate( [ '/scenarios', 'scenario', this.scenarioKey, 'scene', this.sceneKey, 'frame', frameKey ] );

	}

	editFrame( frameKey: string ):void {

		this.router.navigate( [ '/scenarios', 'scenario', this.scenarioKey, 'scene', this.sceneKey, 'frame', 'edit', frameKey ] );		

	}

	removeFrameInterval( frameKey: string ):void {

		let scenarioKey = '' + this.scenarioKey;
		let sceneKey 	= '' + this.sceneKey;

		let promise = this.scenariosService.removeFrame( frameKey, scenarioKey, sceneKey );

		this.frameKeyToRemove = '';


		promise.then( response => {

			this.frameKeyToRemove = frameKey;
			this.arrayKeyToRemove = null;

			this.frames.filter( ( frame, index ) => { if( frame['key'] == frameKey  ){ this.arrayKeyToRemove = index } } );

			this.scenariosService.refreshScenarios();
			
			if ( this.arrayKeyToRemove ) {
				
				delete( this.frames[ this.arrayKeyToRemove ] );

			}
			
		}).catch( error => {

			console.log( 'frame removing error: ', error );

		});			

	}

	removeFrame( frameKey: string ):void {

		this.removeFrameState( frameKey );

		let interval = window.setInterval( this.removeFrameInterval( frameKey ), 500 );

	}

	removeFrameState( frameKey: string ):void {

		this.states[ frameKey ] = 'out';

	}

	animationDone( event: AnimationEvent ):void {

	}
	
}
