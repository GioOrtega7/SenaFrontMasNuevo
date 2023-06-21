import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendModalFormComponent } from './extend-modal-form.component';

describe('ExtendModalFormComponent', () => {
  let component: ExtendModalFormComponent;
  let fixture: ComponentFixture<ExtendModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendModalFormComponent]
    });
    fixture = TestBed.createComponent(ExtendModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
