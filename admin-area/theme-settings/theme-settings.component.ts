import { Component, OnInit } from '@angular/core';

import { HeaderService } from "../../shared/header.service";
import { environment } from "../../../environments/environment";

@Component({
	selector: 'app-theme-settings',
	templateUrl: './theme-settings.component.html',
	styleUrls: ['./theme-settings.component.css']
})
export class ThemeSettingsComponent implements OnInit {

	title 	= 'Theme Settings';
	hostUrl = environment.hostUrl;

	darkTheme = false;

	constructor( private headerService: HeaderService ) { }
	
	ngOnInit() {

		this.darkTheme = this.headerService.darkTheme;
		
		this.headerService.setTitleLeft( this.title );
		this.headerService.hideMenuButton();

	}

	changed( checked: boolean ):void {

		this.headerService.setDarkTheme( checked );

	}


}
