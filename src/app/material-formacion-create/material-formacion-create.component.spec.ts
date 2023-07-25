import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFormacionCreateComponent } from './material-formacion-create.component';

describe('MaterialFormacionCreateComponent', () => {
  let component: MaterialFormacionCreateComponent;
  let fixture: ComponentFixture<MaterialFormacionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialFormacionCreateComponent]
    });
    fixture = TestBed.createComponent(MaterialFormacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
