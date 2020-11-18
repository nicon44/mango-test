import { Component, OnInit } from '@angular/core';
import {RangeConfigurationService} from "../services/range-configuration.service";

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.scss']
})
export class Exercise2Component implements OnInit {

  values:Array<number>;
  myRange: any;

  constructor(private rangeConfigurationService: RangeConfigurationService) { }

  ngOnInit(): void {
    this.rangeConfigurationService.getStepsRange()
      .then(response => {
        console.log(response);
        this.values = response;
      })
  }

  rangeChange(event){
    console.log(event);
  }
}
