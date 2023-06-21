import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChartSoleComponent } from './icon-chart-sole.component';

describe('IconChartSoleComponent', () => {
  let component: IconChartSoleComponent;
  let fixture: ComponentFixture<IconChartSoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconChartSoleComponent]
    });
    fixture = TestBed.createComponent(IconChartSoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
