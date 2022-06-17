import axios from 'axios';
import moment from 'moment';
import {URL} from '../environment';
import {LineSeverity} from '../components/table/types';
import {LeitorResponse, Leitura, StatusLeitura} from '../types/leitura';

const media = (arr: number[]) =>
  arr.reduce((acc, n, _, a) => acc + n / a.length, 0);

export const getLeituras = async (
  equipamentoId: number,
  dataInicial: Date,
  dataFinal: Date,
) => {
  const {data} = await axios.get<LeitorResponse[]>(`${URL}leitors`, {
    params: {_embed: 'leituras', equipamentoId},
  });

  const limiteToleranciaMaxima = media(
    data.map((d) => d.limiteToleranciaMaxima),
  );
  const toleranciaMaxima = media(data.map((d) => d.toleranciaMaxima));
  const toleranciaMinima = media(data.map((d) => d.toleranciaMinima));
  const limiteToleranciaMinima = media(
    data.map((d) => d.limiteToleranciaMinima),
  );

  const leituras: Leitura<Date>[] = [];
  data.forEach((d) =>
    leituras.push(
      ...d.leituras
        .map((l) => ({
          ...l,
          data: new Date(l.data),
          hora: new Date(`1-1-1 ${l.hora}`),
        }))
        .filter((l) =>
          moment(l.data).isBetween(dataInicial, dataFinal, 'days', '[]'),
        ),
    ),
  );

  return {
    limiteToleranciaMaxima,
    toleranciaMaxima,
    toleranciaMinima,
    limiteToleranciaMinima,
    leituras,
  };
};

export const statusToSeverity = (status: StatusLeitura): LineSeverity => {
  switch (status) {
    case StatusLeitura.ACIMA:
      return LineSeverity.WARN;
    case StatusLeitura.FORA:
      return LineSeverity.ERROR;

    default:
      return LineSeverity.NORMAL;
  }
};

export const statusToText = (status: StatusLeitura) => {
  switch (status) {
    case StatusLeitura.ACIMA:
      return 'Acima do esperado';
    case StatusLeitura.FORA:
      return 'Fora do limite de tolerância';

    default:
      return 'Dentro do esperado';
  }
};
