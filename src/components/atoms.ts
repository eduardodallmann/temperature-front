import {atom} from 'jotai';
import {getEquipamentos} from '../services/equipamento.service';
import {Equipamento} from '../types/equipamento';

export const equipamentosAtom = atom<Equipamento[]>([]);

export const getEquipamentosAtom = atom(null, async (get, set) => {
  set(equipamentosAtom, await getEquipamentos());
});
