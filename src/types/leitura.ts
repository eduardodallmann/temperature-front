export enum StatusLeitura {
  DENTRO = 'DENTRO',
  ACIMA = 'ACIMA',
  FORA = 'FORA',
}

export type Leitura<T extends Date | string> = {
  id: number;
  leitorId: number;
  data: T;
  hora: T;
  temperatura: number;
  status: StatusLeitura;
};

export type Leitor = {
  id: string;
  equipamento: string;
  nome: string;
  frequencia: number;
  limiteToleranciaMaxima: number;
  toleranciaMaxima: number;
  toleranciaMinima: number;
  limiteToleranciaMinima: number;
  leituras: Leitura<Date>[];
};

export type LeitorResponse = {
  id: number;
  equipamento: number;
  descricao: string;
  frequenciaLeitura: number;
  limiteToleranciaMaxima: number;
  toleranciaMaxima: number;
  toleranciaMinima: number;
  limiteToleranciaMinima: number;
  leituras: Leitura<string>[];
};
