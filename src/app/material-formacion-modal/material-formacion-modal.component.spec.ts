import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFormacionModalComponent } from './material-formacion-modal.component';

describe('MaterialFormacionModalComponent', () => {
  let component: MaterialFormacionModalComponent;
  let fixture: ComponentFixture<MaterialFormacionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialFormacionModalComponent]
    });
    fixture = TestBed.createComponent(MaterialFormacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
