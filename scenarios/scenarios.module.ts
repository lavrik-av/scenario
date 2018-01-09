import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
    MatSidenavModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSelectModule, 
    MatTabsModule, 
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule,
	MatSlideToggleModule,
	MatDialogModule
} from '@angular/material';

import { EllipsisPipe, NoquotesPipe } from '../shared/ellipsis.pipe';

import { AppScenariosComponent } from "./app-scenarios/app-scenarios.component";
import { ScenariosRoutingModule } from './scenarios-routing.module';
import { ScenariosComponent, DialogOverviewExampleDialog } from './scenarios/scenarios.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { FramesComponent } from './frames/frames.component';
import { FrameComponent } from './frames/frame.component';
import { AddFrameComponent } from './frames/add-frame.component';
import { EditFrameComponent } from './frames/edit-frame.component';

@NgModule({
imports: [
	CommonModule,
	ScenariosRoutingModule,
	MatSidenavModule, 
	MatButtonModule, 
	MatButtonToggleModule, 
	MatCardModule, 
	MatMenuModule, 
	MatToolbarModule, 
	MatIconModule, 
	MatSelectModule,
	MatTabsModule,
	MatGridListModule,
	MatExpansionModule,
	MatDialogModule,
	MatListModule,
	MatInputModule,
	MatSnackBarModule,
	MatSlideToggleModule,
	FormsModule,
	ReactiveFormsModule
],
declarations: [
	AppScenariosComponent,
	ScenariosComponent,
	ScenarioComponent,
	FramesComponent,
	FrameComponent,
	AddFrameComponent,
	EditFrameComponent,
	DialogOverviewExampleDialog,
	EllipsisPipe,
	NoquotesPipe
],
entryComponents: [
    DialogOverviewExampleDialog
  ],

})
export class ScenariosModule { }
