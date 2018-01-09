import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '.././shared/header.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

	title = 'Scenarios';
	
	constructor( private router: Router, private headerService: HeaderService ) { }
	
	ngOnInit() {

		this.headerService.setTitleCenter( this.title );
		this.headerService.showMenuButton();

	}
	
	navigate( url: string ):void {
	
		this.router.navigate(  ['/' + url ]  );
	
	}
	
}
