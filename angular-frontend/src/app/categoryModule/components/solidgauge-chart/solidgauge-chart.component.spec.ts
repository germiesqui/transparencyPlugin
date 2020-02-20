import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidgaugeChartComponent } from './solidgauge-chart.component';

describe('SolidgaugeChartComponent', () => {
  let component: SolidgaugeChartComponent;
  let fixture: ComponentFixture<SolidgaugeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolidgaugeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidgaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
