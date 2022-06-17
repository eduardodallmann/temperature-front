import {atom} from 'jotai';
import {Equipamento} from '../types/equipamento';

export const equipamentosAtom = atom<Equipamento[]>([]);
