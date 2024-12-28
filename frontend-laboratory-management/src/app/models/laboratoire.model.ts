export interface Laboratoire {
  id?: number;
  nom: string;
  logo: string | File; // Accept string or File
  nrc: string; // Numero de Registre de Commerce
  isActive: boolean; // This should be explicitly defined here
  dateActivation?: Date;

}
