import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerShowReportComponent } from './drawer-show-report.component';

describe('DrawerShowReportComponent', () => {
  let component: DrawerShowReportComponent;
  let fixture: ComponentFixture<DrawerShowReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerShowReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerShowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
