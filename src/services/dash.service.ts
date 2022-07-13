import axios from 'axios';
import { URL } from '../environment';
import { Dash } from '../types/dash';

export const getDash = async () => {
  const { data } = await axios.get<{ dashOk: Dash[]; dashBad: Dash[] }>(
    `${URL}leitura/dash`,
  );

  return data;
};
