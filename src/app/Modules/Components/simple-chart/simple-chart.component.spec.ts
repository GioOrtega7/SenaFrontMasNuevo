import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleChartComponent } from './simple-chart.component';

describe('SimpleChartComponent', () => {
  let component: SimpleChartComponent;
  let fixture: ComponentFixture<SimpleChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleChartComponent]
    });
    fixture = TestBed.createComponent(SimpleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
