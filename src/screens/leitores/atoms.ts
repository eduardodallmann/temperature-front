import {atom} from 'jotai';
import {
  saveEquipamento,
  updateEquipamento,
} from '../../services/equipamento.service';
import {Equipamento, EquipamentoWithLeitor} from '../../types/equipamento';
import {getLeitores} from '../../services/leitor.service';
import {Leitor} from '../../types/leitura';

export const equipamentoAtom = atom<Equipamento | undefined>(undefined);

export const leitoresAtom = atom<Leitor[]>([]);

export const getLeitoresAtom = atom(null, async (_, set, id: string) => {
  const response = await getLeitores(id);
  set(leitoresAtom, response.leitors);
  set(equipamentoAtom, {...response});
});

export const showModalLeitorAtom = atom<'new' | 'edit' | undefined>(undefined);

const selectedLeitores = atom<Equipamento[]>([]);

export const selectedLeitoresAtom = atom(
  (get) => get(selectedLeitores),
  (
    _,
    set,
    {equipamento, check}: {equipamento: Equipamento; check: boolean},
  ) => {
    set(selectedLeitores, (current) => {
      if (check) {
        return [...current, equipamento];
      }

      return current.filter((c) => c.id !== equipamento.id);
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

// export const allIntermediateStateLeitoresAtom = atom((get) => {
//   const selected = get(selectedLeitores);

//   if (selected.length > 0 && selected.length !== get(leitoresAtom).length) {
//     return true;
//   }

//   return false;
// });

// export const selectAllLeitoresAtom = atom(null, (get, set, check: boolean) => {
//   if (check) {
//     set(selectedLeitores, get(leitoresAtom));
//   } else {
//     set(selectedLeitores, []);
//   }
// });

// export const deleteEquipamentoAtom = atom(null, async (get, set) => {
//   const selected = get(selectedLeitores).map((s) => s.id);
//   if (selected.length) {
//     await deleteLeitores(selected);
//     set(getLeitoresAtom);
//     set(selectedLeitores, []);
//   }
// });

// export const salvarEquipamentoAtom = atom(
//   null,
//   async (_, set, body: Equipamento) => {
//     if (body.id) await updateEquipamento(body);
//     else await saveEquipamento(body);

//     set(getLeitoresAtom);
//     set(showModalEquipamentoAtom);
//   },
// );
