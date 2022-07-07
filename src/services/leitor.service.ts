import axios from 'axios';
import {Leitor} from '../types/leitura';
import {URL} from '../environment';
import {EquipamentoWithLeitor} from '../types/equipamento';

export const getLeitores = async (equipamentoId: string) => {
  const {data} = await axios.get<EquipamentoWithLeitor>(`${URL}leitor`, {
    params: {equipamentoId},
  });

  return data;
};

export const deleteLeitores = (ids: string[]) => {
  return axios.post(`${URL}leitor/delete`, {ids});
};

export const saveLeitor = async (
  body: Omit<Omit<Leitor, 'id'>, 'leituras'> & {id?: string},
) => {
  const {data} = await axios.post<Leitor>(`${URL}leitor`, body);

  return data;
};
