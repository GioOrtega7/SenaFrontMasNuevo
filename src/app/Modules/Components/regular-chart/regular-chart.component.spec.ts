import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularChartComponent } from './regular-chart.component';

describe('RegularChartComponent', () => {
  let component: RegularChartComponent;
  let fixture: ComponentFixture<RegularChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularChartComponent]
    });
    fixture = TestBed.createComponent(RegularChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
