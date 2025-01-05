import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllContactLaboComponent } from './list-all-contact-labo.component';

describe('ListAllContactLaboComponent', () => {
  let component: ListAllContactLaboComponent;
  let fixture: ComponentFixture<ListAllContactLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllContactLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllContactLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
