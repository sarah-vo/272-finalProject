import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerCreateReportComponent } from './drawer-create-report.component';

describe('DrawerCreateReportComponent', () => {
  let component: DrawerCreateReportComponent;
  let fixture: ComponentFixture<DrawerCreateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerCreateReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerCreateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
