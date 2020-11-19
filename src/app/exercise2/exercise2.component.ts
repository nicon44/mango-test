import { Component, OnInit } from '@angular/core';
import {RangeConfigurationService} from "../services/range-configuration.service";
import {NgcRange} from '../ngc-range/domain/ngc-range.model';

@Component({
    selector: 'app-exercise2',
    templateUrl: './exercise2.component.html',
    styleUrls: ['./exercise2.component.scss']
})
export class Exercise2Component implements OnInit {

    values:Array<number>;
    myRange: NgcRange;

    constructor(private rangeConfigurationService: RangeConfigurationService) { }

    ngOnInit(): void {
        this.rangeConfigurationService.getStepsRange()
            .then(response => {
                this.values = response;
            }, error => {
                console.error(error);
                alert("There was an error trying to get Steps Range: "+error.message);
            });
    }

    rangeChange(event){
        //showing that the event emitter works
        console.log(event);
    }
}
