import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLaboratoryManagementComponent } from './user-laboratory-management.component';

describe('UserLaboratoryManagementComponent', () => {
  let component: UserLaboratoryManagementComponent;
  let fixture: ComponentFixture<UserLaboratoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLaboratoryManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLaboratoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
