import {Analysis} from './Analysis.model';

export interface TestAnalysis {
  id: number;
  nomTest: string;
  sousEpreuve: string;
  intervalMinDeReference: number;
  intervalMaxDeReference: number;
  uniteDeReference: string;
  details: string;
  analysis: Analysis;
}
