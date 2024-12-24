import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboViewComponent } from './labo-view.component';

describe('LaboViewComponent', () => {
  let component: LaboViewComponent;
  let fixture: ComponentFixture<LaboViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaboViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
