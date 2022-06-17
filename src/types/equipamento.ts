export type Equipamento = {
  id: number;
  nome: string;
  permanencia: number;
};

export type FiltroEquipamentoData = {
  equipamento?: number;
  dataInicial: Date;
  dataFinal: Date;
};
