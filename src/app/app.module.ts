import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Exercise1Component } from './exercise1/exercise1.component';
import { Exercise2Component } from './exercise2/exercise2.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RangeConfigurationService} from "./services/range-configuration.service";
import {NgcRangeModule} from "./ngc-range/ngc-range.module";

@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Exercise2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgcRangeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RangeConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
