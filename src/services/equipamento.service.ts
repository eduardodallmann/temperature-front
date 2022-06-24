import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {URL} from '../environment';
import {Equipamento} from '../types/equipamento';

export const getEquipamentos = async () => {
  const {data} = await axios.get<Equipamento[]>(`${URL}equipamentos`);

  return data;
};

export const deleteEquipamentos = (ids: string[]) => {
  return Promise.all(ids.map((i) => axios.delete(`${URL}equipamentos/${i}`)));
};

export const saveEquipamento = async (body: Omit<Equipamento, 'id'>) => {
  const {data} = await axios.post<Equipamento>(`${URL}equipamentos`, {
    ...body,
    id: uuidv4(),
  });

  return data;
};

export const updateEquipamento = async (body: Equipamento) => {
  const {data} = await axios.put<Equipamento>(
    `${URL}equipamentos/${body.id}`,
    body,
  );

  return data;
};
