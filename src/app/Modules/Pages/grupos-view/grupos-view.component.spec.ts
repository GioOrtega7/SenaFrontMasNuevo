import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposViewComponent } from './grupos-view.component';

describe('GruposViewComponent', () => {
  let component: GruposViewComponent;
  let fixture: ComponentFixture<GruposViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GruposViewComponent]
    });
    fixture = TestBed.createComponent(GruposViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
