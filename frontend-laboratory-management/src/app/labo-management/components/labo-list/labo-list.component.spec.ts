import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboListComponent } from './labo-list.component';

describe('LaboListComponent', () => {
  let component: LaboListComponent;
  let fixture: ComponentFixture<LaboListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaboListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
