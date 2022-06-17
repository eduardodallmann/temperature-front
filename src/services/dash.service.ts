import axios from 'axios';
import {URL} from '../environment';
import {Dash} from '../types/dash';

export const getDash = async () => {
  const {data} = await axios.get<Dash[]>(`${URL}dash`);

  return data;
};
