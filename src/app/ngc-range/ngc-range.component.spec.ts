import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgcRangeComponent} from './ngc-range.component';
import {BrowserModule, By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {CommonModule} from '@angular/common';
import {NgcConstants} from './constants/ngc.constants';

describe('NgcRangeComponent', () => {
    let component: NgcRangeComponent;
    let fixture: ComponentFixture<NgcRangeComponent>;
    let helper: Helper;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NgcRangeComponent ],
            imports: [
                NgxSliderModule,
                CommonModule,
                BrowserModule,
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgcRangeComponent);
        component = fixture.componentInstance;
        helper = new Helper();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Default Slider', () => {

        let initialLowValue;
        let initialHighValue;

        //setting up the initial config of a default type slider
        beforeEach(() => {
            component.min = 1;
            component.max = 100;
            component.editingHighValue = false;
            component.editingLowValue = false;
            initialLowValue = 10;
            initialHighValue = 90;
            component.range.lowValue = initialLowValue;
            component.range.highValue = initialHighValue;
        });

        it('fixedType variable should be false', () => {
            expect(component.fixedType).toBeFalse();
        });

        it('should change low value after input change', (done) => {
            component.editingLowValue = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const lowValueInput = helper.getFirstNativeElement(fixture, 'input');
                lowValueInput.value = 50;
                lowValueInput.dispatchEvent(new Event('blur'));
                expect(component.range.lowValue).toBe(50);
                done();
            });
        });

        it('should change high value after input change', (done) => {
            component.editingHighValue = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const highValueInput = helper.getFirstNativeElement(fixture, 'input');
                highValueInput.value = 50;
                highValueInput.dispatchEvent(new Event('blur'));
                expect(component.range.highValue).toBe(50);
                done();
            });
        });

        it('should show an input after clicking on the lowValue label', (done) => {
            const lowValueLabel = helper.getFirstNativeElement(fixture, 'label');
            lowValueLabel.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.editingLowValue).toBeTrue();
                const lowValueInput = helper.getFirstNativeElement(fixture, 'input');
                expect(lowValueInput).toBeTruthy();
                done();
            });
        });

        it('should show an input after clicking on the highValue label', (done) => {
            const highValueLabel = helper.getSpecificNativeElement(fixture, 'label', 1);
            highValueLabel.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.editingHighValue).toBeTrue();
                const highValueInput = helper.getFirstNativeElement(fixture, 'input');
                expect(highValueInput).toBeTruthy();
                done();
            });
        });

        it('should not push lowValue if I try to set a highValue lower than lowValue', () => {
            let event = {
                "srcElement": {
                    "value": 5
                }
            };
            component.setHighValue(event);
            expect(component.range.highValue).toBe(initialLowValue);
            expect(component.range.lowValue).toBe(initialLowValue);
        });

        it('should not push highValue if I try to set a lowValue higher than highValue', () => {
            let event = {
                "srcElement": {
                    "value": 95
                }
            };
            component.setLowValue(event);
            expect(component.range.lowValue).toBe(initialHighValue);
            expect(component.range.highValue).toBe(initialHighValue);
        });
    });

    describe('Fixed type Slider', () => {
        //setting up the initial config of a fixed type slider
        beforeEach(() => {
            component.type = NgcConstants.FIXED;
            component.values = [2, 3, 4, 9, 11];
            component.ngOnInit();
        });

        it('fixedType variable should be true', () => {
            expect(component.fixedType).toBeTrue();
        });

        it('values should be sorted', (done) => {
            component.values = [7, 5, 6, 3, 4, 1];
            component.ngOnInit();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.values).toEqual([1, 3, 4, 5, 6, 7]);
                done();
            })
        });

        it('lowValue should move to the nearest value available when the set value is not a permitted value', (done) => {
            component.range.lowValue = 5;
            fixture.detectChanges();
            fixture.whenStable().then(()=> {
                expect(component.range.lowValue).toBe(4);
                done();
            })
        });

        it('highValue should move to the nearest value available when the set value is not a permitted value', (done) => {
            component.range.highValue = 8;
            fixture.detectChanges();
            fixture.whenStable().then(()=> {
                expect(component.range.highValue).toBe(9);
                done();
            })
        });
    });

});

class Helper{
    getFirstNativeElement(fixture: ComponentFixture<NgcRangeComponent>, cssQuery:string){
        return fixture.debugElement.query(By.css(cssQuery)).nativeElement;
    }

    getSpecificNativeElement(fixture: ComponentFixture<NgcRangeComponent>, cssQuery:string, position: number){
        let debugElements = fixture.debugElement.queryAll(By.css(cssQuery));
        return debugElements[position].nativeElement;
    }
}
