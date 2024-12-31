import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianDashboardComponentComponent } from './technician-dashboard-component.component';

describe('TechnicianDashboardComponentComponent', () => {
  let component: TechnicianDashboardComponentComponent;
  let fixture: ComponentFixture<TechnicianDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicianDashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
