import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EpreuveService } from './epreuve.service';
import { Epreuve } from '../../models/Epreuve.model';

describe('EpreuveService', () => {
  let service: EpreuveService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpreuveService],
    });
    service = TestBed.inject(EpreuveService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all epreuves', () => {
    const mockEpreuves: Epreuve[] = [
      { id: 1, fkIdAnalyse: 1001, analysis: {} as any, nom: 'Analyse 1' },
      { id: 2, fkIdAnalyse: 1002, analysis: {} as any, nom: 'Analyse 2' },
    ];

    service.getAllEpreuves().subscribe((epreuves) => {
      expect(epreuves.length).toBe(2);
      expect(epreuves).toEqual(mockEpreuves);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/epreuves');
    expect(req.request.method).toBe('GET');
    req.flush(mockEpreuves);
  });

  it('should retrieve an epreuve by id', () => {
    const mockEpreuve: Epreuve = { id: 1, fkIdAnalyse: 1001, analysis: {} as any, nom: 'Analyse 1' };

    service.getEpreuveById(1).subscribe((epreuve) => {
      expect(epreuve).toEqual(mockEpreuve);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/epreuves/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockEpreuve);
  });

  it('should create a new epreuve', () => {
    const newEpreuve: Epreuve = { id: 3, fkIdAnalyse: 1003, analysis: {} as any, nom: 'Analyse 3' };

    service.createEpreuve(newEpreuve).subscribe((epreuve) => {
      expect(epreuve).toEqual(newEpreuve);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/epreuves');
    expect(req.request.method).toBe('POST');
    req.flush(newEpreuve);
  });

  it('should update an epreuve', () => {
    const updatedEpreuve: Epreuve = { id: 1, fkIdAnalyse: 1001, analysis: {} as any, nom: 'Analyse Modifiée' };

    service.updateEpreuve(1, updatedEpreuve).subscribe((epreuve) => {
      expect(epreuve).toEqual(updatedEpreuve);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/epreuves/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEpreuve);
  });

  it('should delete an epreuve', () => {
    service.deleteEpreuve(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8084/api/epreuves/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});
