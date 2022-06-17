import {atom} from 'jotai';
import {getDash} from '../../services/dash.service';
import {StatusLeitura} from '../../types/leitura';
import {Dash} from '../../types/dash';

const dash = atom<Dash[]>([]);

export const dashErrorsAtom = atom((get) =>
  get(dash).filter((d) => d.status === StatusLeitura.FORA),
);

export const dashOkAtom = atom((get) =>
  get(dash).filter((d) => d.status !== StatusLeitura.FORA),
);

export const loadDashAtom = atom(null, async (_, set) => {
  set(dash, await getDash());
});
