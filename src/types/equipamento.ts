export type Equipamento = {
  id: number;
  nome: string;
  permanencia: number;
};

export type FiltroEquipamentoData = {
  equipamentoId?: number;
  equipamentoNome?: string;
  dataInicial: Date;
  dataFinal: Date;
};
