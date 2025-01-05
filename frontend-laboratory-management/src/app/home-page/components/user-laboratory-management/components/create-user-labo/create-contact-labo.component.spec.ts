import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactLaboComponent } from './create-contact-labo.component';

describe('CreateContactLaboComponent', () => {
  let component: CreateContactLaboComponent;
  let fixture: ComponentFixture<CreateContactLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContactLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContactLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
