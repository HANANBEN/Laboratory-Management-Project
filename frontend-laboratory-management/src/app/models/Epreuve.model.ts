import { Analysis } from './Analysis.model';

export interface Epreuve {
  id: number; // Identifiant unique de l'épreuve
  fkIdAnalyse: number; // Clé étrangère vers l'analyse
  analysis: Analysis; // Analyse associée à l'épreuve
  nom: string; // Nom de l'épreuve
}
