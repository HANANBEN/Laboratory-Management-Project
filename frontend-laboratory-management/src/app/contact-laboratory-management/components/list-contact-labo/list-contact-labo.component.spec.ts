import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactLaboComponent } from './list-contact-labo.component';

describe('ListContactLaboComponent', () => {
  let component: ListContactLaboComponent;
  let fixture: ComponentFixture<ListContactLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListContactLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListContactLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
