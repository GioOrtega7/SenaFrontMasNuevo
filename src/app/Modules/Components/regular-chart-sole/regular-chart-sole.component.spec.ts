import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularChartSoleComponent } from './regular-chart-sole.component';

describe('RegularChartSoleComponent', () => {
  let component: RegularChartSoleComponent;
  let fixture: ComponentFixture<RegularChartSoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularChartSoleComponent]
    });
    fixture = TestBed.createComponent(RegularChartSoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
