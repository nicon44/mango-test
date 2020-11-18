import { Component, OnInit } from '@angular/core';
import {RangeConfigurationService} from "../services/range-configuration.service";
import {NgcRange} from "../ngc-range/domain/ngc-range.model";

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.scss']
})
export class Exercise1Component implements OnInit {

  constructor(private rangeConfigurationService: RangeConfigurationService) { }

  myRange: NgcRange;

  min:number;
  max:number;

  ngOnInit(): void {
    this.rangeConfigurationService.getMinMaxRange()
      .then(response => {
        console.log(response);
        this.min = response.min;
        this.max = response.max;
      })
  }

  onClick(){
    this.myRange.lowValue++;
    this.myRange.highValue--;
  }

  rangeChange(event){
    console.log(event);
  }

}
