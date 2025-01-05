import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CreateExamenComponent } from './create-examen.component';
import { ExamenService } from '../../../services/examen-service/examen.service';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { EpreuveService } from '../../../services/epreuve-service/epreuve.service';
import { AnalysisService } from '../../../services/analysis-service/analysis.service';
import { PatientService } from '../../../services/patient-service/patient.service';
import { of } from 'rxjs';

describe('CreateExamenComponent', () => {
  let component: CreateExamenComponent;
  let fixture: ComponentFixture<CreateExamenComponent>;
  let examenService: ExamenService;
  let dossierService: DossierService;
  let epreuveService: EpreuveService;
  let analysisService: AnalysisService;
  let patientService: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CreateExamenComponent],
      providers: [
        ExamenService,
        DossierService,
        EpreuveService,
        AnalysisService,
        PatientService,
      ],
    });

    fixture = TestBed.createComponent(CreateExamenComponent);
    component = fixture.componentInstance;
    examenService = TestBed.inject(ExamenService);
    dossierService = TestBed.inject(DossierService);
    epreuveService = TestBed.inject(EpreuveService);
    analysisService = TestBed.inject(AnalysisService);
    patientService = TestBed.inject(PatientService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load all data on init', () => {
    spyOn(dossierService, 'getAllDossiers').and.returnValue(of([]));
    spyOn(epreuveService, 'getAllEpreuves').and.returnValue(of([]));
    spyOn(analysisService, 'getAllAnalyses').and.returnValue(of([]));
    spyOn(patientService, 'getAllPatients').and.returnValue(of([]));

    component.ngOnInit();

    expect(dossierService.getAllDossiers).toHaveBeenCalled();
    expect(epreuveService.getAllEpreuves).toHaveBeenCalled();
    expect(analysisService.getAllAnalyses).toHaveBeenCalled();
    expect(patientService.getAllPatients).toHaveBeenCalled();
  });

  it('should call createExamen method and handle success', () => {
    spyOn(examenService, 'createExamen').and.returnValue(of({}));

    component.createExamen();

    expect(examenService.createExamen).toHaveBeenCalled();
  });
});
