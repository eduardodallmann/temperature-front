import { atom } from 'jotai';
import { getDash } from '../../services/dash.service';
import { Dash } from '../../types/dash';

export const dashErrorsAtom = atom<Dash[]>([]);

export const dashOkAtom = atom<Dash[]>([]);

export const loadDashAtom = atom(null, async (_, set) => {
  const { dashOk, dashBad } = await getDash();
  set(dashOkAtom, dashOk);
  set(dashErrorsAtom, dashBad);
});
