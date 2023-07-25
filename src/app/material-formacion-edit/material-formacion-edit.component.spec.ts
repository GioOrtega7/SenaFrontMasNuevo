import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFormacionEditComponent } from './material-formacion-edit.component';

describe('MaterialFormacionEditComponent', () => {
  let component: MaterialFormacionEditComponent;
  let fixture: ComponentFixture<MaterialFormacionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialFormacionEditComponent]
    });
    fixture = TestBed.createComponent(MaterialFormacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
