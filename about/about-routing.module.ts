import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppInfoComponent } from "../app-info/app-info.component";

const routes: Routes = [
	{ path: '', component: AppInfoComponent }  
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AboutRoutingModule { }
