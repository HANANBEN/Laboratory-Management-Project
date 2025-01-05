import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllEpreuveComponent } from './list-all-epreuve.component';

describe('ListAllEpreuveComponent', () => {
  let component: ListAllEpreuveComponent;
  let fixture: ComponentFixture<ListAllEpreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAllEpreuveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAllEpreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
