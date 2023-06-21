import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChartComponent } from './icon-chart.component';

describe('IconChartComponent', () => {
  let component: IconChartComponent;
  let fixture: ComponentFixture<IconChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconChartComponent]
    });
    fixture = TestBed.createComponent(IconChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
