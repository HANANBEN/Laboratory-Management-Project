import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboEditComponent } from './labo-edit.component';

describe('LaboEditComponent', () => {
  let component: LaboEditComponent;
  let fixture: ComponentFixture<LaboEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaboEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
