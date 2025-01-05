import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdressCreateComponent } from './../../../adress-management/components/adress-create';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdressCreateComponent', () => {
  let component: AdressCreateComponent;
  let fixture: ComponentFixture<AdressCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdressCreateComponent],
      imports: [
        FormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
