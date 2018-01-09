import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { environment } from "../../../environments/environment";
import { ScenariosService } from "../../shared/scenarios.service";
import { HeaderService } from "../../shared/header.service";

@Component({
	selector: 'app-frame',
	templateUrl: './frame.component.html',
	styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

	title 					= '';
	private scenarioKey		= '';
	private sceneKey		= '';
	private frameKey		= '';
	private frame: object;

	private hostUrl	= environment.hostUrl;
	
	constructor( 
		private activatedRoute: ActivatedRoute, 
		private scenariosService: ScenariosService,
		private headerService: HeaderService,
		private router: Router
	) { }
	
	ngOnInit() {

		this.headerService.showHeaderActionButtons( false );
		this.headerService.showHeaderActionButtonsDone( false );

		this.activatedRoute.params.subscribe( params => {
		
			this.frame = this.scenariosService.getFrame( params['scenarioKey'], params['sceneKey'], params['frameKey'] );

			this.title = this.frame['title'];
			this.headerService.setTitleLeft( this.title );

		});

	}

	editFrame( frame: any ):void {

		this.activatedRoute.params.subscribe( params => {

			this.router.navigate( [ '/scenarios', 'scenario', params['scenarioKey'], 'scene', params['sceneKey'], 'frame', 'edit', params['frameKey'] ] );
	
		});

	}

	generateArray(obj): object[]{
		
		return Object.keys(obj).map((key)=>{ return obj[key]});
		
	} 
	
}
