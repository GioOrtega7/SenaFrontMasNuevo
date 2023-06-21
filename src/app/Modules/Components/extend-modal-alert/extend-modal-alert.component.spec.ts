import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendModalAlertComponent } from './extend-modal-alert.component';

describe('ExtendModalAlertComponent', () => {
  let component: ExtendModalAlertComponent;
  let fixture: ComponentFixture<ExtendModalAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendModalAlertComponent]
    });
    fixture = TestBed.createComponent(ExtendModalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
