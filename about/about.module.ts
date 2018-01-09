import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';

import { AppInfoComponent } from "../app-info/app-info.component";

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule
  ],
  declarations: [
    AppInfoComponent
  ]
})
export class AboutModule { }
