import { Component, OnInit } from '@angular/core';
import { HeaderService } from "../shared/header.service";

@Component({
	selector: 'app-app-info',
	templateUrl: './app-info.component.html',
	styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {

	title = 'About';

	constructor( private headerService: HeaderService ) { }
	
	ngOnInit() {

		this.headerService.setTitleLeft( this.title );		
		this.headerService.hideMenuButton();
	
	}

}
