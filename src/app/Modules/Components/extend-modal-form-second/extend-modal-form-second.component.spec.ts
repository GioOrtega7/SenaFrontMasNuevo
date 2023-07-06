import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendModalFormSecondComponent } from './extend-modal-form-second.component';

describe('ExtendModalFormSecondComponent', () => {
  let component: ExtendModalFormSecondComponent;
  let fixture: ComponentFixture<ExtendModalFormSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendModalFormSecondComponent]
    });
    fixture = TestBed.createComponent(ExtendModalFormSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
