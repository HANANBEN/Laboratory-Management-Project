import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdressHomeComponent } from './adress-home.component';

describe('AdressHomeComponent', () => {
  let component: AdressHomeComponent;
  let fixture: ComponentFixture<AdressHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressHomeComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdressHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
