import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAnalysisComponent } from './edit-analysis.component';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditAnalysisComponent', () => {
  let component: EditAnalysisComponent;
  let fixture: ComponentFixture<EditAnalysisComponent>;
  let analysisServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    // Mock AnalysisService
    analysisServiceMock = {
      getAnalysisById: jasmine.createSpy('getAnalysisById').and.returnValue(
        of({
          id: 1,
          fkLaboratoireId: 1,
          nom: 'Analysis 1',
          description: 'Description 1',
          testAnalysis: [],
        })
      ),
      updateAnalysis: jasmine.createSpy('updateAnalysis').and.returnValue(of({})),
    };

    // Mock Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Mock ActivatedRoute
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'), // Simulates analysisId = 1
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [EditAnalysisComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AnalysisService, useValue: analysisServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load analysis on initialization', () => {
    component.ngOnInit();
    expect(analysisServiceMock.getAnalysisById).toHaveBeenCalledWith(1);
    expect(component.analysis.nom).toEqual('Analysis 1');
  });

  it('should call updateAnalysis on submit', () => {
    spyOn(component, 'submitAnalysis').and.callThrough();
    component.analysis = {
      id: 1,
      fkLaboratoireId: 1,
      nom: 'Updated Analysis',
      description: 'Updated Description',
      testAnalysis: [],
    };
    component.submitAnalysis();
    expect(analysisServiceMock.updateAnalysis).toHaveBeenCalledWith(1, component.analysis);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should navigate back to list on cancel', () => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list']);
  });
});
