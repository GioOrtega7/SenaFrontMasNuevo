import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExtendInformationComponent } from './table-extend-information.component';

describe('TableExtendInformationComponent', () => {
  let component: TableExtendInformationComponent;
  let fixture: ComponentFixture<TableExtendInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableExtendInformationComponent]
    });
    fixture = TestBed.createComponent(TableExtendInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
