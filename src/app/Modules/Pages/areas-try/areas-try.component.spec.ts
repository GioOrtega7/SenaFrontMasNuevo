import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasTryComponent } from './areas-try.component';

describe('AreasTryComponent', () => {
  let component: AreasTryComponent;
  let fixture: ComponentFixture<AreasTryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasTryComponent]
    });
    fixture = TestBed.createComponent(AreasTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
