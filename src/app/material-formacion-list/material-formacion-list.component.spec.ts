import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialFormacionListComponent } from './material-formacion-list.component';

describe('MaterialFormacionListComponent', () => {
  let component: MaterialFormacionListComponent;
  let fixture: ComponentFixture<MaterialFormacionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialFormacionListComponent]
    });
    fixture = TestBed.createComponent(MaterialFormacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
