import {atom} from 'jotai';

export const showMenuAtom = atom(false);

export const toggleMenuAtom = atom(null, (get, set) =>
  set(showMenuAtom, !get(showMenuAtom)),
);
