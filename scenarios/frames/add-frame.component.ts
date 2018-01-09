import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as FrameModel from "../../core/models/frame";
import { ScenariosService } from "../../shared/scenarios.service";
import { HeaderService } from "../../shared/header.service";

@Component({
	selector: 'app-add-frame',
	templateUrl: './add-frame.component.html',
	styleUrls: ['./add-frame.component.css']
})
export class AddFrameComponent implements OnInit {

	private scenarioKey: 0;
	private sceneKey:	 0;

	frame: FrameModel.Frame;
	
	constructor( 
		private activatedRoute: ActivatedRoute, 
		private router: Router,
		private scenariosService: ScenariosService,
		private headerService: HeaderService
	) {}
	
	ngOnInit() {

		this.headerService.showHeaderActionButtons( true );
		this.headerService.showHeaderActionButtonsDone( true );

		this.activatedRoute.params.subscribe( params => {

			this.scenarioKey = params['scenarioKey'];
			this.sceneKey 	 = params['sceneKey'];

		});
	
		this.headerService.onHeaderActionButtonCloseClicked().subscribe( show => {
			
			this.goBack();

		});					

		this.headerService.onHeaderActionButtonDoneClicked().subscribe( show => {

			this.add();

		});
		
		this.frame = new FrameModel.Frame;
	
	}
	
	add(): void {
		
		if ( this.scenariosService.addFrame( this.frame, this.scenarioKey, this.sceneKey  ) ) {

			this.scenariosService.refreshScenarios();
			
			this.goBack();

		} else {

			console.log( 'You do not have access!' );
			
		}

	}
	
	goBack(): void {
	
		this.router.navigate( ['/scenarios', 'scenario', this.scenarioKey, 'scene', this.sceneKey, 'frames' ] );
	
	}

}
