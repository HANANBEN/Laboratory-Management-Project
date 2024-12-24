import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboCreateComponent } from './labo-create.component';

describe('LaboCreateComponent', () => {
  let component: LaboCreateComponent;
  let fixture: ComponentFixture<LaboCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaboCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
