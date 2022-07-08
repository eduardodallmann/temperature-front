import axios from 'axios';
import moment from 'moment';
import {URL} from '../environment';
import {LineSeverity} from '../components/table/types';
import {LeitorResponse, StatusLeitura} from '../types/leitura';

export const getLeituras = async (
  equipamentoId: string,
  dataInicial: Date,
  dataFinal: Date,
): Promise<LeitorResponse<Date>> => {
  const {data} = await axios.get<LeitorResponse<string>>(`${URL}leitura`, {
    params: {
      equipamentoId,
      dataInicial: moment(dataInicial).format('YYYY-MM-DD'),
      dataFinal: moment(dataFinal).format('YYYY-MM-DD'),
    },
  });

  return {
    ...data,
    leituras: data.leituras.map((l) => ({...l, data: new Date(l.data)})),
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
