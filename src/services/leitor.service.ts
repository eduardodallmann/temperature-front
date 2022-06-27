import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {Leitor} from '../types/leitura';
import {URL} from '../environment';
import {EquipamentoWithLeitor} from '../types/equipamento';

export const getLeitores = async (id: string) => {
  const {data} = await axios.get<EquipamentoWithLeitor>(
    `${URL}equipamentos/${id}`,
    {params: {_embed: 'leitors'}},
  );

  return data;
};

export const deleteLeitores = (ids: string[]) => {
  return Promise.all(ids.map((i) => axios.delete(`${URL}leitors/${i}`)));
};

export const saveLeitor = async (body: Omit<Leitor, 'id'>) => {
  const {data} = await axios.post<Leitor>(`${URL}leitors`, {
    ...body,
    id: uuidv4(),
  });

  return data;
};

export const updateLeitor = async (body: Leitor) => {
  const {data} = await axios.put<Leitor>(`${URL}leitors/${body.id}`, body);

  return data;
};
