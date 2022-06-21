import {atom} from 'jotai';
import {
  deleteEquipamentos,
  postEquipamento,
} from '../../services/equipamento.service';
import {equipamentosAtom, getEquipamentosAtom} from '../../components/atoms';
import {Equipamento} from '../../types/equipamento';

export const showModalEquipamentoAtom = atom(false);

const selectedEquipamentos = atom<Equipamento[]>([]);

export const selectedEquipamentosAtom = atom(
  (get) => get(selectedEquipamentos),
  (
    _,
    set,
    {equipamento, check}: {equipamento: Equipamento; check: boolean},
  ) => {
    set(selectedEquipamentos, (current) => {
      if (check) {
        return [...current, equipamento];
      }

      return current.filter((c) => c.id !== equipamento.id);
    });
  },
);

export const allCheckStateEquipamentosAtom = atom((get) => {
  const selected = get(selectedEquipamentos);

  if (selected.length === 0) {
    return false;
  }

  return true;
});

export const allIntermediateStateEquipamentosAtom = atom((get) => {
  const selected = get(selectedEquipamentos);

  if (selected.length > 0 && selected.length !== get(equipamentosAtom).length) {
    return true;
  }

  return false;
});

export const selectAllEquipamentosAtom = atom(
  null,
  (get, set, check: boolean) => {
    if (check) {
      set(selectedEquipamentos, get(equipamentosAtom));
    } else {
      set(selectedEquipamentos, []);
    }
  },
);

export const deleteEquipamentoAtom = atom(null, async (get, set) => {
  const selected = get(selectedEquipamentos).map((s) => s.id);
  if (selected.length) {
    await deleteEquipamentos(selected);
    set(getEquipamentosAtom);
    set(selectedEquipamentos, []);
  }
});

export const salvarEquipamentoAtom = atom(
  null,
  async (_, set, body: Omit<Equipamento, 'id'>) => {
    await postEquipamento(body);
    set(getEquipamentosAtom);
    set(showModalEquipamentoAtom, false);
  },
);
