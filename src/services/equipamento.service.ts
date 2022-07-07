import axios from 'axios';
import {URL} from '../environment';
import {Equipamento} from '../types/equipamento';

export const getEquipamentos = async () => {
  const {data} = await axios.get<Equipamento[]>(`${URL}equipamento`);

  return data;
};

export const deleteEquipamentos = (ids: string[]) => {
  return axios.post(`${URL}equipamento/delete`, {ids});
};

export const saveEquipamento = async (body: Partial<Equipamento>) => {
  const {data} = await axios.post<Equipamento>(`${URL}equipamento`, body);

  return data;
};
