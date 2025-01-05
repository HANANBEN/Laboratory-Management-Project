import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExamenService } from './examen.service';
import { Examen } from '../../models/Examen.model';

describe('ExamenService', () => {
  let service: ExamenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExamenService],
    });
    service = TestBed.inject(ExamenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all examens', () => {
    const mockExamens: Examen[] = [
      { id: 1, fkNumDossier: 123, dossier: {} as any, fkIdEpeuve: 456, epreuve: {} as any, fkIdTestAnalysis: 789, testAnalysis: {} as any, fkPatientId: 101, patient: {} as any, resultat: 'Positive' },
      { id: 2, fkNumDossier: 124, dossier: {} as any, fkIdEpeuve: 457, epreuve: {} as any, fkIdTestAnalysis: 790, testAnalysis: {} as any, fkPatientId: 102, patient: {} as any, resultat: 'Negative' },
    ];

    service.getAllExamens().subscribe((examens) => {
      expect(examens.length).toBe(2);
      expect(examens).toEqual(mockExamens);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/examens');
    expect(req.request.method).toBe('GET');
    req.flush(mockExamens);
  });

  it('should retrieve an examen by id', () => {
    const mockExamen: Examen = { id: 1, fkNumDossier: 123, dossier: {} as any, fkIdEpeuve: 456, epreuve: {} as any, fkIdTestAnalysis: 789, testAnalysis: {} as any, fkPatientId: 101, patient: {} as any, resultat: 'Positive' };

    service.getExamenById(1).subscribe((examen) => {
      expect(examen).toEqual(mockExamen);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/examens/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockExamen);
  });

  it('should create a new examen', () => {
    const newExamen: Examen = { id: 3, fkNumDossier: 125, dossier: {} as any, fkIdEpeuve: 458, epreuve: {} as any, fkIdTestAnalysis: 791, testAnalysis: {} as any, fkPatientId: 103, patient: {} as any, resultat: 'Pending' };

    service.createExamen(newExamen).subscribe((examen) => {
      expect(examen).toEqual(newExamen);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/examens');
    expect(req.request.method).toBe('POST');
    req.flush(newExamen);
  });

  it('should update an examen', () => {
    const updatedExamen: Examen = { id: 1, fkNumDossier: 123, dossier: {} as any, fkIdEpeuve: 456, epreuve: {} as any, fkIdTestAnalysis: 789, testAnalysis: {} as any, fkPatientId: 101, patient: {} as any, resultat: 'Negative' };

    service.updateExamen(1, updatedExamen).subscribe((examen) => {
      expect(examen).toEqual(updatedExamen);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/examens/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedExamen);
  });

  it('should delete an examen', () => {
    service.deleteExamen(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8084/api/examens/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});
