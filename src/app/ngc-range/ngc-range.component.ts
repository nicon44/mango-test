import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {CustomStepDefinition, Options} from '@angular-slider/ngx-slider';
import {NgcRange} from "./domain/ngc-range.model";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgcConstants} from "./constants/ngc.constants";

@Component({
  selector: 'ngc-range',
  templateUrl: './ngc-range.component.html',
  styleUrls: ['./ngc-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgcRangeComponent),
      multi: true
    }
  ]
})
export class NgcRangeComponent implements OnInit, ControlValueAccessor {

  editingLowValue: boolean = false;
  editingHighValue: boolean = false;

  //default min 0
  @Input() min: number = 0;

  //default max 100
  @Input() max: number = 100;

  @Input() type: string;

  @Input() values: Array<number>;

  @Output() rangeChange: EventEmitter<NgcRange>;

  fixedType:boolean = false;

  range: NgcRange = new NgcRange();

  options: Options;

  onChange = (_:any) => { };
  onTouch = () => { };

  constructor() {
    this.rangeChange = new EventEmitter<NgcRange>();
  }

  ngOnInit(): void {

    this.options = {
        noSwitching: true
    };

    //check type
    if(this.type === NgcConstants.FIXED){
      //fixed type
      this.fixedType = true;
      if(this.values && this.values.length > 0){
        this.sortValues();
        this.configureFixedType();
      }else{
        throw new Error("You need to specify input 'values' for fixed type.");
      }
    }else if(this.type && this.type !== NgcConstants.FIXED){
      //type not supported
      throw new Error("Type ["+this.type+"] not supported for NgcRangeComponent");
    }else{
      //default type
      this.fixedType = false;
      this.configureDefaultType();
    }

  }
  configureDefaultType(){
    this.options.floor = this.min;
    this.options.ceil = this.max;

    //setting default range
    this.range.lowValue = this.min;
    this.range.highValue = this.max;
  }

  configureFixedType(){
    this.configureSteps();
    this.options.showTicks = true;

    //setting default range
    this.range.lowValue = this.values[0];
    this.range.highValue = this.values[this.values.length - 1];
  }

  sortValues(){
    this.values.sort((a,b) => a - b);
  }

  configureSteps(){
    let stepsArray:Array<CustomStepDefinition> = [];
    this.values.forEach( value => {
      stepsArray.push({"value": value});
    });
    this.options.stepsArray = stepsArray;
  }

  setLowValue(event){
    let newValue:number = Number(event.srcElement.value);

    if(newValue > this.range.highValue){
      newValue = this.range.highValue;
    }

    this.range.lowValue = newValue;
    this.editingLowValue = false;
  }

  setHighValue(event){
    let newValue:number = Number(event.srcElement.value);

    if(newValue < this.range.lowValue){
      newValue = this.range.lowValue;
    }

    this.range.highValue = newValue;
    this.editingHighValue= false;
  }

  editLowValue(){
    if(!this.fixedType){
      this.editingLowValue = true;
    }
  }

  editHighValue(){
    if(!this.fixedType){
      this.editingHighValue = true;
    }
  }

  rangeHasChanged(){
    this.rangeChange.emit(this.range);
  }


  //ngModel binding:

  writeValue(value: NgcRange): void {
    if (value) {
      this.range = value;
    } else {
      this.range.lowValue = this.min;
      this.range.highValue = this.max;
    }
    this.onTouch();
    this.onChange(this.range);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
