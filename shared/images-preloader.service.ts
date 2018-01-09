import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs/Observable";

import { ScenariosService } from "./scenarios.service";

@Injectable()
export class ImagesPreloaderService {

	constructor( private scenariosService: ScenariosService ) {}
	
	preloadScenariosImages(): Observable<string[]> {
	
		let scenariosImages: string[] = [
			'/images/scenarios/california.jpg',
			'/images/scenarios/laura.jpg',
			'/images/scenarios/biker.jpg',
			'/images/scenarios/childhood.jpg'
		];

		return Observable.of( scenariosImages );

	}
	
}
