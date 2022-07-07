import {atom} from 'jotai';
import {Equipamento} from '../../types/equipamento';
import {
  deleteLeitores,
  getLeitores,
  saveLeitor,
} from '../../services/leitor.service';
import {Leitor} from '../../types/leitura';

export const equipamentoAtom = atom<Equipamento | undefined>(undefined);

export const leitoresAtom = atom<Leitor[]>([]);

export const getLeitoresAtom = atom(null, async (_, set, id: string) => {
  const response = await getLeitores(id);
  set(leitoresAtom, response.leitores);
  set(equipamentoAtom, {...response});
});

export const showModalLeitorAtom = atom<'new' | 'edit' | undefined>(undefined);

const selectedLeitores = atom<Leitor[]>([]);

export const selectedLeitoresAtom = atom(
  (get) => get(selectedLeitores),
  (_, set, {leitor, check}: {leitor: Leitor; check: boolean}) => {
    set(selectedLeitores, (current) => {
      if (check) {
        return [...current, leitor];
      }

      return current.filter((c) => c.id !== leitor.id);
    });
  },
);

export const allCheckStateLeitoresAtom = atom((get) => {
  const selected = get(selectedLeitores);

  if (selected.length === 0) {
    return false;
  }

  return true;
});

export const allIntermediateStateLeitoresAtom = atom((get) => {
  const selected = get(selectedLeitores);

  if (selected.length > 0 && selected.length !== get(leitoresAtom).length) {
    return true;
  }

  return false;
});

export const selectAllLeitoresAtom = atom(null, (get, set, check: boolean) => {
  if (check) {
    set(selectedLeitores, get(leitoresAtom));
  } else {
    set(selectedLeitores, []);
  }
});

export const deleteLeitorAtom = atom(
  null,
  async (get, set, leitorId: string) => {
    const selected = get(selectedLeitores).map((s) => s.id);
    if (selected.length) {
      await deleteLeitores(selected);
      set(getLeitoresAtom, leitorId);
      set(selectedLeitores, []);
    }
  },
);

export const salvarLeitorAtom = atom(
  null,
  async (_, set, body: Omit<Leitor, 'leituras'>) => {
    if (body.id) {
      await saveLeitor(body);
    } else {
      await saveLeitor({...body, id: undefined});
    }
    set(getLeitoresAtom, body.equipamento);
    set(showModalLeitorAtom);
  },
);
