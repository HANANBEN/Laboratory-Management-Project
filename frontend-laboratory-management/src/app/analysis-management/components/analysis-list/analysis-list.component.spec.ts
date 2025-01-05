import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisListComponent } from './analysis-list.component';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnalysisListComponent', () => {
  let component: AnalysisListComponent;
  let fixture: ComponentFixture<AnalysisListComponent>;
  let analysisServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Mock AnalysisService
    analysisServiceMock = {
      listAnalysesByLaboratoryId: jasmine.createSpy('listAnalysesByLaboratoryId').and.returnValue(of([])),
      deleteAnalysis: jasmine.createSpy('deleteAnalysis').and.returnValue(of(null)),
    };

    // Mock Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Mock ActivatedRoute
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'), // Simulates labId = 1
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [AnalysisListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AnalysisService, useValue: analysisServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAnalyses on initialization', () => {
    spyOn(component, 'loadAnalyses');
    component.ngOnInit();
    expect(component.loadAnalyses).toHaveBeenCalled();
  });

  it('should fetch analyses from the service', () => {
    component.loadAnalyses();
    expect(analysisServiceMock.listAnalysesByLaboratoryId).toHaveBeenCalledWith(1);
    expect(component.analyses).toEqual([]);
  });

  it('should navigate to edit-analysis page when navigateToEditAnalysis is called', () => {
    const analysisId = 123;
    component.navigateToEditAnalysis(analysisId);
    expect(routerMock.navigate).toHaveBeenCalledWith([`/edit-analysis/${analysisId}`]);
  });

  it('should delete an analysis and reload the list', () => {
    spyOn(component, 'loadAnalyses');
    const analysisId = 456;
    component.deleteAnalysis(analysisId);
    expect(analysisServiceMock.deleteAnalysis).toHaveBeenCalledWith(analysisId);
    expect(component.loadAnalyses).toHaveBeenCalled();
  });
});
