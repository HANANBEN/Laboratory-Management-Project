import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllUserLaboComponent } from './list-all-user-labo.component';

describe('ListAllContactLaboComponent', () => {
  let component: ListAllUserLaboComponent;
  let fixture: ComponentFixture<ListAllUserLaboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllUserLaboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllUserLaboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
