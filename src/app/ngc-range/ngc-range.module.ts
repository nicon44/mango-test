import { NgModule } from '@angular/core';
import { NgcRangeComponent } from './ngc-range.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AutoFocusDirective} from "./directives/auto-focus.directive";


@NgModule({
  declarations: [
    NgcRangeComponent,
    AutoFocusDirective
  ],
  imports: [
    NgxSliderModule,
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  exports: [NgcRangeComponent]
})
export class NgcRangeModule { }
