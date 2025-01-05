import { Dossier } from './Dossier.model';
import { Epreuve } from './Epreuve.model';
import { Analysis } from './Analysis.model';
import { Patient } from './Patient.model';

export interface Examen {
  id: number; // Identifiant unique de l'examen
  fkNumDossier: number; // Clé étrangère vers le numéro de dossier
  dossier: Dossier; // Dossier associé à l'examen
  fkIdEpeuve: number; // Clé étrangère vers l'épreuve
  epreuve: Epreuve; // Epreuve associée à l'examen
  fkIdTestAnalysis: number; // Clé étrangère vers l'analyse de test
  testAnalysis: Analysis; // Analyse de test associée à l'examen
  fkPatientId: number; // Clé étrangère vers le patient
  patient: Patient; // Patient associé à l'examen
  resultat?: string; // Résultat de l'examen (optionnel)
}
