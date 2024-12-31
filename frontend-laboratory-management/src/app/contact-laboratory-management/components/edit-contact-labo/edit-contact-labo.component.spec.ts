import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactLaboComponent } from './edit-contact-labo.component';

describe('EditContactLaboComponent', () => {
  let component: EditContactLaboComponent;
  let fixture: ComponentFixture<EditContactLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditContactLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
