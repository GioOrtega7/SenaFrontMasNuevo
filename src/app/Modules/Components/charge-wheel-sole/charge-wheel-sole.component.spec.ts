import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeWheelSoleComponent } from './charge-wheel-sole.component';

describe('ChargeWheelSoleComponent', () => {
  let component: ChargeWheelSoleComponent;
  let fixture: ComponentFixture<ChargeWheelSoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeWheelSoleComponent]
    });
    fixture = TestBed.createComponent(ChargeWheelSoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
