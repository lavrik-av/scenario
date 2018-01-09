import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppScenariosComponent } from "./app-scenarios/app-scenarios.component";
import { ScenariosComponent } from "./scenarios/scenarios.component";
import { ScenarioComponent } from './scenario/scenario.component';
import { FramesComponent } from './frames/frames.component';
import { AddFrameComponent } from "./frames/add-frame.component";
import { FrameComponent } from "./frames/frame.component";
import { EditFrameComponent } from "./frames/edit-frame.component";

const routes: Routes = [
	{ path : '', component : AppScenariosComponent, children : [
		{ path : '', component : ScenariosComponent },
		{ path : 'scenario/:key', component : ScenarioComponent},
		{ path : 'scenario/:scenarioKey/scene/:sceneKey/frames', component: FramesComponent },
		{ path : 'scenario/:scenarioKey/scene/:sceneKey/frame/:frameKey', component: FrameComponent },
		{ path : 'scenario/:scenarioKey/scene/:sceneKey/frames/add', component: AddFrameComponent },
		{ path : 'scenario/:scenarioKey/scene/:sceneKey/frame/edit/:frameKey', component: EditFrameComponent }
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ScenariosRoutingModule { }

/* 
	{ path: 'scenario/:key',   component: ScenarioComponent },
	{ path: 'scenario/:scenarioKey/scene/:sceneKey/frames', component: FramesComponent },
	{ path: 'scenario/:scenarioKey/scene/:sceneKey/frames/add', component: AddFrameComponent },
	{ path: 'scenario/:scenarioKey/scene/:sceneKey/frame/:frameKey', component: FrameComponent },
	{ path: 'scenario/:scenarioKey/scene/:sceneKey/frame/edit/:frameKey', component: EditFrameComponent },

 */
