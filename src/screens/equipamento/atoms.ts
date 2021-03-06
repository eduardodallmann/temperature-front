import { atom } from 'jotai';
import {
  deleteEquipamentos,
  saveEquipamento,
} from '../../services/equipamento.service';
import { equipamentosAtom, getEquipamentosAtom } from '../../components/atoms';
import { Equipamento } from '../../types/equipamento';
import { snackbarError } from '../snackbars';

export const showModalEquipamentoAtom = atom<'new' | 'edit' | undefined>(
  undefined,
);

export const showModalEquipamentoExclusaoAtom = atom(false);

const selectedEquipamentos = atom<Equipamento[]>([]);

export const selectedEquipamentosAtom = atom(
  (get) => get(selectedEquipamentos),
  (
    _,
    set,
    { equipamento, check }: { equipamento: Equipamento; check: boolean },
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
    try {
      await deleteEquipamentos(selected);
      set(getEquipamentosAtom);
      set(selectedEquipamentos, []);
    } catch (error) {
      set(snackbarError, 'Não é possível remover');
    } finally {
      set(showModalEquipamentoExclusaoAtom, false);
    }
  }
});

export const salvarEquipamentoAtom = atom(
  null,
  async (_, set, body: Equipamento) => {
    try {
      if (body.id) {
        await saveEquipamento(body);
      } else {
        await saveEquipamento({
          nome: body.nome,
          permanencia: body.permanencia,
        });
      }
      set(showModalEquipamentoAtom);
      set(getEquipamentosAtom);
    } catch (error) {
      set(snackbarError, 'Não é possível salvar');
    }
  },
);
