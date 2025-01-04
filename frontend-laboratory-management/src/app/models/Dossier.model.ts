import { Patient } from './Patient.model';

export interface Dossier {
  numDossier: number; // Numéro unique du dossier
  patient: Patient; // Informations du patient associé
  fkEmailUtilisateur: number; // Clé étrangère vers l'utilisateur (ID ou email)
  date: string; // Date du dossier (format ISO, ex: 'YYYY-MM-DD')
  user?: { // Informations utilisateur optionnelles
    email: string; // Email de l'utilisateur
    nomComplet: string; // Nom complet de l'utilisateur
    profession: string; // Profession de l'utilisateur
  };
}
