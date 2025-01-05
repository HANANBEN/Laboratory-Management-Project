import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDossierComponent } from './list-dossier.component';
import { DossierService } from '../../../services/dossier-service/dossier.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListDossierComponent', () => {
  let component: ListDossierComponent;
  let fixture: ComponentFixture<ListDossierComponent>;
  let dossierServiceMock: jasmine.SpyObj<DossierService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Créer un mock pour le service DossierService
    dossierServiceMock = jasmine.createSpyObj('DossierService', ['listAllDossiers', 'deleteDossier']);

    // Créer un mock pour Router
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ ListDossierComponent ],
      providers: [
        { provide: DossierService, useValue: dossierServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore les erreurs liées aux composants enfants non définis
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Déclenche le cycle de détection des changements
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dossiers on initialization', () => {
    const dossiersMock = [
      { numDossier: 1, patient: { nomComplet: 'John Doe' }, date: new Date(), user: { email: 'john.doe@example.com' } },
      { numDossier: 2, patient: { nomComplet: 'Jane Doe' }, date: new Date(), user: { email: 'jane.doe@example.com' } }
    ];
    dossierServiceMock.listAllDossiers.and.returnValue(of(dossiersMock));

    component.ngOnInit();

    expect(dossierServiceMock.listAllDossiers).toHaveBeenCalled();
    expect(component.dossiers.length).toBe(2);
  });

  it('should navigate to viewDossier', () => {
    const numDossier = 1;
    component.viewDossier(numDossier);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dossier', numDossier]);
  });

  it('should navigate to editDossier', () => {
    const numDossier = 1;
    component.editDossier(numDossier);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dossier/edit', numDossier]);
  });

  it('should delete a dossier', () => {
    const numDossier = 1;
    component.dossiers = [
      { numDossier: 1, patient: { nomComplet: 'John Doe' }, date: new Date(), user: { email: 'john.doe@example.com' } }
    ];
    dossierServiceMock.deleteDossier.and.returnValue(of(null)); // Simuler la suppression réussie

    component.deleteDossier(numDossier);

    expect(dossierServiceMock.deleteDossier).toHaveBeenCalledWith(numDossier);
    expect(component.dossiers.length).toBe(0);
  });

  it('should confirm before deleting a dossier', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simule une confirmation
    const numDossier = 1;
    component.dossiers = [
      { numDossier: 1, patient: { nomComplet: 'John Doe' }, date: new Date(), user: { email: 'john.doe@example.com' } }
    ];

    component.deleteDossier(numDossier);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this dossier?');
  });

  it('should not delete a dossier if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simule une annulation
    const numDossier = 1;
    component.dossiers = [
      { numDossier: 1, patient: { nomComplet: 'John Doe' }, date: new Date(), user: { email: 'john.doe@example.com' } }
    ];

    component.deleteDossier(numDossier);

    expect(dossierServiceMock.deleteDossier).not.toHaveBeenCalled();
  });

  it('should navigate to addNewDossier', () => {
    component.addNewDossier();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dossier/create']);
  });
});
