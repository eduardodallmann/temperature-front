import axios from 'axios';
import {URL} from '../environment';
import {Equipamento} from '../types/equipamento';

export const getEquipamentos = async () => {
  const {data} = await axios.get<Equipamento[]>(`${URL}equipamentos`);

  return data;
};
