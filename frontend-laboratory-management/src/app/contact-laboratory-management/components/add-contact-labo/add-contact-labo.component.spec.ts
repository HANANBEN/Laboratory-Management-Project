import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactLaboComponent } from './add-contact-labo.component';

describe('AddContactLaboComponent', () => {
  let component: AddContactLaboComponent;
  let fixture: ComponentFixture<AddContactLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddContactLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
