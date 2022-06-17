import {useUpdateAtom} from 'jotai/utils';
import React, {useEffect} from 'react';
import {buscaLeiturasAtom} from './relatorio/atoms';
import {RelatorioFiltro} from './relatorio/filtro';
import {RelatorioTable} from './relatorio/table';

export function RelatorioScreen() {
  const buscaLeituras = useUpdateAtom(buscaLeiturasAtom);

  useEffect(() => {
    buscaLeituras();
  }, []);

  return (
    <>
      <RelatorioFiltro />
      <RelatorioTable />
    </>
  );
}
