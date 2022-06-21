export type Equipamento = {
  id: string;
  nome: string;
  permanencia: number;
};

export type FiltroEquipamentoData = {
  equipamentoId?: string;
  equipamentoNome?: string;
  dataInicial: Date;
  dataFinal: Date;
};
