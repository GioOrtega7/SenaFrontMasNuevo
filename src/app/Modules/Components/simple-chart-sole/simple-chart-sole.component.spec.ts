import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChartSoleComponent } from './simple-chart-sole.component';

describe('SimpleChartSoleComponent', () => {
  let component: SimpleChartSoleComponent;
  let fixture: ComponentFixture<SimpleChartSoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleChartSoleComponent]
    });
    fixture = TestBed.createComponent(SimpleChartSoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
