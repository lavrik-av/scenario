import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

import { HeaderService } from "../../shared/header.service";
import { UserForm } from "../../core/models/user";


@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	title = 'Add User';
	user = new UserForm();
	userFormReact: FormGroup;
	
	constructor( private headerService: HeaderService, private fb: FormBuilder ) { }
	
	ngOnInit() {
	
		this.headerService.hideMenuButton();
		this.headerService.setTitleLeft( this.title );
		
		this.createForm();

	}

	createForm():void {

		this.userFormReact = this.fb.group(
			{ 
				login :  [ '', [ Validators.required, Validators.email, Validators.minLength ] ],
				password : [ '', [ Validators.required, Validators.minLength ] ]
			}
		);

	}
	
	addUser( user: object ):void {
	
	}
	
	goBack():void {
	
		window.history.back();

	}
	
}