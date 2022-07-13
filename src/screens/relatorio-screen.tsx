import { useUpdateAtom } from 'jotai/utils';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { URL } from '../environment';
import { buscaLeiturasAtom } from './relatorio/atoms';
import { RelatorioFiltro } from './relatorio/filtro';
import { RelatorioTable } from './relatorio/table';

export function RelatorioScreen() {
  const socket = io(URL);
  const buscaLeituras = useUpdateAtom(buscaLeiturasAtom);

  socket.on('update', () => {
    buscaLeituras();
  });

  useEffect(() => {
    buscaLeituras();

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RelatorioFiltro />
      <RelatorioTable />
    </>
  );
}
