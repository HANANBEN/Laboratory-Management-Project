export interface Laboratoire {
  id?: number;
  nom: string;
  logo: string;
  nrc: string; // Numero de Registre de Commerce
  isActive: boolean;
  dateActivation?: Date;
}
