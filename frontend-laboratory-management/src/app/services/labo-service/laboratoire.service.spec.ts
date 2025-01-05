import { TestBed } from '@angular/core/testing';
import { LaboratoireService } from './laboratoire.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Laboratoire } from '../../models/laboratoire.model';

describe('LaboratoireService', () => {
  let service: LaboratoireService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8989/laboratories';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LaboratoireService],
    });
    service = TestBed.inject(LaboratoireService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all laboratoires', () => {
    const mockLaboratoires: Laboratoire[] = [
      { id: 1, nom: 'Lab 1', logo: 'logo1.png', nrc: '12345', isActive: true },
      { id: 2, nom: 'Lab 2', logo: 'logo2.png', nrc: '67890', isActive: false },
    ];

    service.getLaboratoires().subscribe((laboratoires) => {
      expect(laboratoires).toEqual(mockLaboratoires);
    });

    const req = httpMock.expectOne(`${apiUrl}?projection=fullLaboratory`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLaboratoires);
  });

  it('should fetch laboratoire by ID', () => {
    const mockLaboratoire: Laboratoire = { id: 1, nom: 'Lab 1', logo: 'logo1.png', nrc: '12345', isActive: true };

    service.getLaboratoireById(1).subscribe((laboratoire) => {
      expect(laboratoire).toEqual(mockLaboratoire);
    });

    const req = httpMock.expectOne(`${apiUrl}/1?projection=fullLaboratory`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLaboratoire);
  });

  it('should update a laboratoire', () => {
    const updatedLaboratoire: Laboratoire = { id: 1, nom: 'Updated Lab', logo: 'logo-updated.png', nrc: '12345', isActive: true };

    service.updateLaboratoire(1, updatedLaboratoire).subscribe((laboratoire) => {
      expect(laboratoire).toEqual(updatedLaboratoire);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedLaboratoire); // Vérifie que le corps de la requête est correct
    req.flush(updatedLaboratoire);
  });

});
