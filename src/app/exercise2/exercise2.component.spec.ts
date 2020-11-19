import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise2Component } from './exercise2.component';
import {RangeConfigurationService} from '../services/range-configuration.service';

describe('Exercise2Component', () => {
  let component: Exercise2Component;
  let fixture: ComponentFixture<Exercise2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise2Component ],
        providers: [
            {provide: RangeConfigurationService, useClass: RangeConfigurationServiceStub}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

class RangeConfigurationServiceStub{
    getStepsRange(): Promise<Array<number>> {
        return new Promise<Array<number>> ((resolve) => {
            resolve([1, 2, 3, 4, 5]);
        });
    }

}
