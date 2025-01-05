
import {Analysis} from './Analysis.model';

export interface Epreuve {
  id?: number; // Optional for new records
  nom: string;
  fkIdAnalyse: number | null | undefined;
  analysis? : Analysis | null ;
}
