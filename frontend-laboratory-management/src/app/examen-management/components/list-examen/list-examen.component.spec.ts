import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListExamenComponent } from './list-examen.component';
import { ExamenService } from '../../../services/examen-service/examen.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ListExamenComponent', () => {
  let component: ListExamenComponent;
  let fixture: ComponentFixture<ListExamenComponent>;
  let examenService: ExamenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListExamenComponent],
      imports: [HttpClientTestingModule],
      providers: [ExamenService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamenComponent);
    component = fixture.componentInstance;
    examenService = TestBed.inject(ExamenService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load examens on init', () => {
    const mockExamens = [
      { id: 1, patient: { nomComplet: 'John Doe' }, epreuve: { name: 'Blood Test' }, testAnalysis: { name: 'Positive' }, resultat: 'Passed' },
      { id: 2, patient: { nomComplet: 'Jane Doe' }, epreuve: { name: 'X-ray' }, testAnalysis: { name: 'Negative' }, resultat: 'Failed' }
    ];

    spyOn(examenService, 'getAllExamens').and.returnValue(of(mockExamens));

    component.ngOnInit();

    expect(component.examens.length).toBe(2);
    expect(component.examens[0].patient.nomComplet).toBe('John Doe');
  });

  it('should delete an examen', () => {
    const examenId = 1;
    spyOn(examenService, 'deleteExamen').and.returnValue(of(void 0));
    spyOn(component, 'loadExamens');

    component.deleteExamen(examenId);

    expect(examenService.deleteExamen).toHaveBeenCalledWith(examenId);
    expect(component.loadExamens).toHaveBeenCalled();
  });
});
