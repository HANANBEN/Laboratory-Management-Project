import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnalysisService } from './analysis.service';
import { Analysis } from '../../models/Analysis.model';

describe('AnalysisService', () => {
  let service: AnalysisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnalysisService],
    });
    service = TestBed.inject(AnalysisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch analyses by laboratory ID', () => {
    const mockResponse = {
      _embedded: {
        analyses: [
          { id: 1, fkLaboratoireId: 101, nom: 'Analysis 1', description: 'Description 1', testAnalysis: [] },
          { id: 2, fkLaboratoireId: 101, nom: 'Analysis 2', description: 'Description 2', testAnalysis: [] },
        ],
      },
    };

    service.listAnalysesByLaboratoryId(101).subscribe((analyses) => {
      expect(analyses.length).toBe(2);
      expect(analyses[0].nom).toBe('Analysis 1');
      expect(analyses[1].description).toBe('Description 2');
    });

    const req = httpMock.expectOne('http://localhost:5678/analyses/search/byLaboratoryId?laboratoryId=101&projection=fullAnalysis');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch analysis details by ID', () => {
    const mockAnalysis: Analysis = {
      id: 1,
      fkLaboratoireId: 101,
      nom: 'Analysis 1',
      description: 'Detailed description',
      testAnalysis: [],
    };

    service.getAnalysisById(1).subscribe((analysis) => {
      expect(analysis).toBeTruthy();
      expect(analysis.id).toBe(1);
      expect(analysis.nom).toBe('Analysis 1');
    });

    const req = httpMock.expectOne('http://localhost:5678/analyses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockAnalysis);
  });
});
