import {Leitor} from './leitura';

export type Equipamento = {
  id: string;
  nome: string;
  permanencia: number;
};

export type EquipamentoWithLeitor = {
  id: string;
  nome: string;
  permanencia: number;
  leitors: Leitor[];
};

export type FiltroEquipamentoData = {
  equipamentoId?: string;
  equipamentoNome?: string;
  dataInicial: Date;
  dataFinal: Date;
};
