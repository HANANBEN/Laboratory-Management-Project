import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestAnalysisService } from './testAnalysis.service';
import { TestAnalysis } from '../../models/TestAnalysis.model';

describe('TestAnalysisService', () => {
  let service: TestAnalysisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestAnalysisService],
    });

    service = TestBed.inject(TestAnalysisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch test analyses by analysis ID', () => {
    const mockTestAnalyses: TestAnalysis[] = [
      {
        id: 1,
        nomTest: 'Test 1',
        sousEpreuve: 'Sous-épreuve 1',
        intervalMinDeReference: 10,
        intervalMaxDeReference: 20,
        uniteDeReference: 'mg/L',
        details: 'Détails spécifiques au test',
      },
    ];

    service.listTestAnalysisByAnalysisId(1).subscribe((testAnalyses) => {
      expect(testAnalyses).toEqual(mockTestAnalyses);
    });

    const req = httpMock.expectOne(
      'http://localhost:6789/testAnalyses/search/byAnalysisId?analysisId=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ _embedded: { testAnalyses: mockTestAnalyses } });
  });

  it('should fetch test analysis by ID', () => {
    const mockTestAnalysis: TestAnalysis = {
      id: 1,
      nomTest: 'Test 1',
      sousEpreuve: 'Sous-épreuve 1',
      intervalMinDeReference: 10,
      intervalMaxDeReference: 20,
      uniteDeReference: 'mg/L',
      details: 'Détails spécifiques au test',
    };

    service.getTestAnalysisById(1).subscribe((testAnalysis) => {
      expect(testAnalysis).toEqual(mockTestAnalysis);
    });

    const req = httpMock.expectOne('http://localhost:6789/testAnalyses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTestAnalysis);
  });

  it('should create a test analysis', () => {
    const newTestAnalysis: TestAnalysis = {
      id: 2,
      nomTest: 'Test 2',
      sousEpreuve: 'Sous-épreuve 2',
      intervalMinDeReference: 15,
      intervalMaxDeReference: 25,
      uniteDeReference: 'g/L',
      details: 'Nouveau test',
    };

    service.createTestAnalysis(newTestAnalysis).subscribe((testAnalysis) => {
      expect(testAnalysis).toEqual(newTestAnalysis);
    });

    const req = httpMock.expectOne('http://localhost:5678/testAnalyses');
    expect(req.request.method).toBe('POST');
    req.flush(newTestAnalysis);
  });

  it('should delete a test analysis', () => {
    service.deleteTestAnalysis(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:6789/testAnalyses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
