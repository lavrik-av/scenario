import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ScenariosService } from '../../shared/scenarios.service';
import { HeaderService } from '../../shared/header.service';

@Component({
	selector: 'app-scenario',
	templateUrl: './scenario.component.html',
	styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

	private scenario: any;
	private hostUrl = environment.hostUrl;
	private scenarioKey = 0;

	constructor( 
		private route: ActivatedRoute, 
		private scenariosService: ScenariosService, 
		private headerService: HeaderService,
		private router: Router
	) { }
	
	ngOnInit() {
	
		this.headerService.hideMenuButton();

		this.headerService.showHeaderActionButtons( false );
		this.headerService.showHeaderActionButtonsDone( false );

		this.route.params.subscribe( params => {
			
			this.scenarioKey 	= params['key'];

			this.scenario 		= this.scenariosService.getScenario( params['key'] );

			this.headerService.setTitleLeft( this.scenario.title );

		});

	}

	showFrames( sceneKey: string ): void {

        this.router.navigate( ['/scenarios', 'scenario', this.scenarioKey, 'scene', sceneKey, 'frames' ] );
		

	}

	addFrame( sceneKey: string ): void {

		this.router.navigate( ['/scenarios', 'scenario', this.scenarioKey, 'scene', sceneKey, 'frames', 'add' ] );

	}

    generateArray(obj): object[]{
		
		return Object.keys(obj).map((key)=>{ return obj[key]});
		
	} 
		
}
