import {StatusLeitura} from './leitura';

export type Dash = {
  nome: string;
  hora: string;
  temperatura: number;
  status: StatusLeitura;
  qtdErros?: number;
};
