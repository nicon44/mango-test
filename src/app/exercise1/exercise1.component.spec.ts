import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Exercise1Component} from './exercise1.component';
import {RangeConfigurationService} from '../services/range-configuration.service';

describe('Exercise1Component', () => {
  let component: Exercise1Component;
  let fixture: ComponentFixture<Exercise1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise1Component ],
        providers: [
            {provide: RangeConfigurationService, useClass: RangeConfigurationServiceStub}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Exercise1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

class RangeConfigurationServiceStub{
    getMinMaxRange(): Promise<any> {
        return new Promise<any> ((resolve) => {
            resolve({
                "min": 1,
                "max": 100
            });
        });
    }
}
