import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAnalysisComponent } from './create-analysis.component';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateAnalysisComponent', () => {
  let component: CreateAnalysisComponent;
  let fixture: ComponentFixture<CreateAnalysisComponent>;
  let analysisServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock AnalysisService
    analysisServiceMock = {
      createAnalysis: jasmine.createSpy('createAnalysis').and.returnValue(of({})),
    };

    // Mock Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateAnalysisComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AnalysisService, useValue: analysisServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createAnalysis on submit', () => {
    spyOn(component, 'submitAnalysis').and.callThrough();
    component.analysis = {
      id: 0,
      fkLaboratoireId: 1,
      nom: 'Analysis 1',
      description: 'Description 1',
      testAnalysis: [],
    };
    component.submitAnalysis();
    expect(analysisServiceMock.createAnalysis).toHaveBeenCalledWith(component.analysis);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should navigate back to list on cancel', () => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/list']);
  });
});
