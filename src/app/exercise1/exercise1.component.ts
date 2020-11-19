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
                this.min = response.min;
                this.max = response.max;
            }, error => {
                console.error(error);
                alert("There was an error trying to get Min and Max Range: "+error.message);
            });
    }

    rangeChange(event){
        //showing that the event emitter works
        console.log(event);
    }

}
