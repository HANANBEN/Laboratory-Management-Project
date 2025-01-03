import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpreuveCreateComponent } from './epreuve-create.component';

describe('EpreuveCreateComponent', () => {
  let component: EpreuveCreateComponent;
  let fixture: ComponentFixture<EpreuveCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpreuveCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpreuveCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
