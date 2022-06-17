import {atom} from 'jotai';
import {Leitura, StatusLeitura} from '../../types/leitura';
import {FiltroEquipamentoData} from '../../types/equipamento';
import {getLeituras} from '../../services/leituras.service';

export const filtros = atom<FiltroEquipamentoData>({
  dataInicial: new Date(),
  dataFinal: new Date(),
});

export const filtrosAtom = atom(
  (get) => get(filtros),
  (get, set, newValue: Partial<FiltroEquipamentoData>) => {
    set(filtros, {...get(filtros), ...newValue});
  },
);

export const tabelaAtom = atom<Leitura<Date>[]>([]);

const limites = atom<{
  limiteToleranciaMaxima: number;
  toleranciaMaxima: number;
  toleranciaMinima: number;
  limiteToleranciaMinima: number;
}>({
  limiteToleranciaMaxima: 0,
  toleranciaMaxima: 0,
  toleranciaMinima: 0,
  limiteToleranciaMinima: 0,
});

export const mediasAtom = atom<{
  count: number;
  media: number;
  status: StatusLeitura;
}>((get) => {
  const dados = get(tabelaAtom);
  const media = dados.reduce(
    (acc, {temperatura}, _, a) => acc + temperatura / a.length,
    0,
  );
  const {
    limiteToleranciaMaxima,
    limiteToleranciaMinima,
    toleranciaMaxima,
    toleranciaMinima,
  } = get(limites);
  let status = StatusLeitura.DENTRO;
  if (media >= limiteToleranciaMaxima || media <= limiteToleranciaMinima) {
    status = StatusLeitura.FORA;
  } else if (media >= toleranciaMaxima || media <= toleranciaMinima) {
    status = StatusLeitura.ACIMA;
  }

  return {
    count: dados.length,
    media,
    status,
  };
});

export const buscaLeiturasAtom = atom(null, async (get, set) => {
  const {equipamento, dataFinal, dataInicial} = get(filtros);
  if (equipamento) {
    const {
      leituras,
      limiteToleranciaMaxima,
      limiteToleranciaMinima,
      toleranciaMaxima,
      toleranciaMinima,
    } = await getLeituras(equipamento, dataInicial, dataFinal);

    set(limites, {
      limiteToleranciaMaxima,
      limiteToleranciaMinima,
      toleranciaMaxima,
      toleranciaMinima,
    });

    set(tabelaAtom, leituras);
  }
});
