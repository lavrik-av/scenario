import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FirebaseService } from "../shared/firebase.service";

import { EllipsisPipe } from "../shared/ellipsis.pipe";

@Injectable()
export class ScenariosService {

	subscription: Subscription; 
	
	findKey = 0;

	public scenarios: Observable<any[]>;

	constructor( private firebaseService: FirebaseService, private db: AngularFireDatabase ) { }

	setScenarios( scenarios: Observable<any> ): void {

		this.scenarios = scenarios;

	}

	refreshScenarios():void {

        this.subscription = this.firebaseService.getScenarios().subscribe( scenarios => {
			
			this.scenarios = scenarios;
			this.setScenarios( this.scenarios );

		});					

	}

	getScenario( key ): any {

		return this.scenarios.filter( ( scenario: any  ) => scenario.key == key )[0];

	}

	getScenarios(): any {

		return this.scenarios;

	}

	getScenariosImages(): string[] {

		let scenariosImages: string[] = [
			'/images/scenarios/california.jpg',
			'/images/scenarios/laura.jpg',
			'/images/scenarios/biker.jpg',
			'/images/scenarios/childhood.jpg'
		];

		return scenariosImages;

	}

	getScene( scenarioKey: number, sceneKey: number ): any {

		let scenario = this.getScenario( scenarioKey );
		return scenario.scenes['scene' + sceneKey];

	}

	getFrames( scenarioKey: number, sceneKey: number ): any {

		let scenario = this.getScenario( scenarioKey );
		return scenario.scenes['scene' + sceneKey].frames;

	}

	getFrame(  scenarioKey, sceneKey, frameKey: string  ): object {

		let frames = this.getFrames( scenarioKey, sceneKey );

		return frames[ frameKey ];

	}

	addFrame( frame: any, scenarioKey: number, sceneKey: number ): boolean {

		let result  = false;
		let promise = this.db.list(`/${this.getScenario( scenarioKey ).keyString}/scenes/scene${sceneKey}/frames`).push( frame );

		let promiseFrame = this.db.list(`/${this.getScenario( scenarioKey ).keyString}/scenes/scene${sceneKey}/frames`).update( promise.key, { key : promise.key } );
		
		if ( promise.key ) {
			
			let scenario = this.getScenario( scenarioKey );

			//remove it
			//let promiseFrame = this.db.list(`/${this.getScenario( scenarioKey ).keyString}/scenes/scene${sceneKey}/frames`).update( promise.key, { key : promise.key } );

			frame.key = promise.key;

			scenario.scenes['scene' + sceneKey].frames[ '' + promise.key ] = frame;

			result = true;
	
		}

		return result;
			
	}

	updateFrame( frame: any, scenarioKey: string, sceneKey: string  ): Promise<any> {

		return this.db.list(`/${this.getScenario( scenarioKey ).keyString}/scenes/scene${sceneKey}/frames`).update( frame.key, frame );

	}

	removeFrame( frameKey: string, scenarioKey: string, sceneKey: string  ): Promise<any> {

		return this.db.list(`/${this.getScenario( scenarioKey ).keyString}/scenes/scene${sceneKey}/frames`).remove( frameKey );

	}

    generateArray(obj): object[]{
		
		return Object.keys(obj).map((key)=>{ return obj[key]});
		
	} 
	
}
