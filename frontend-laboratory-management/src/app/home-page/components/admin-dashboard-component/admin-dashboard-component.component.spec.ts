import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponentComponent } from './admin-dashboard-component.component';

describe('AdminDashboardComponentComponent', () => {
  let component: AdminDashboardComponentComponent;
  let fixture: ComponentFixture<AdminDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
